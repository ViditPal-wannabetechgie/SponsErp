import os
from concurrent.futures import ThreadPoolExecutor
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import serpapi
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

app = FastAPI(title="Hyper-Local Micro-Sponsorship Intelligence API")

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# SerpApi Configuration
SERPAPI_KEY = os.getenv("SERPAPI_KEY")
client = serpapi.Client(api_key=SERPAPI_KEY) if SERPAPI_KEY else None

# Supabase Configuration
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase_client: Client | None = None
if SUPABASE_URL and SUPABASE_KEY and SUPABASE_URL.strip() and SUPABASE_KEY.strip():
    try:
        supabase_client = create_client(SUPABASE_URL.strip(), SUPABASE_KEY.strip())
    except Exception as e:
        print(f"Notice: Supabase client initialization error: {e}")

class EventAnalysisRequest(BaseModel):
    location_name: str
    lat: float
    lng: float
    attendee_count: int
    user_role: str
    event_category: str
    user_id: str | None = None

def sync_supabase_background(req_dict: dict, sponsors: list, anchors: list):
    """Save data asynchronously in background to avoid blocking HTTP response."""
    if not supabase_client:
        return
    try:
        analysis_payload = {
            "location_name": req_dict["location_name"],
            "lat": req_dict["lat"],
            "lng": req_dict["lng"],
            "attendee_count": req_dict["attendee_count"],
            "user_role": req_dict["user_role"],
            "event_category": req_dict["event_category"]
        }
        if req_dict.get("user_id"):
            analysis_payload["user_id"] = req_dict["user_id"]

        analysis_record = supabase_client.table("event_analyses").insert(analysis_payload).execute()
        
        if analysis_record.data and len(analysis_record.data) > 0:
            analysis_id = analysis_record.data[0]["id"]
            
            if sponsors:
                sponsor_rows = [
                    {
                        "analysis_id": analysis_id,
                        "name": s["name"] or "Unknown Business",
                        "address": s["address"] or "Unlisted",
                        "category": s["category"],
                        "rating": s["rating"],
                        "reviews": s["reviews"],
                        "score": s["score"],
                        "phone": s["phone"],
                        "website": s["website"]
                    }
                    for s in sponsors
                ]
                supabase_client.table("sponsors").insert(sponsor_rows).execute()
                
            if anchors:
                anchor_rows = [
                    {
                        "analysis_id": analysis_id,
                        "name": a["name"] or "Unknown Anchor",
                        "address": a["address"] or "Unlisted",
                        "category": a["category"],
                        "rating": a["rating"],
                        "reviews": a["reviews"]
                    }
                    for a in anchors
                ]
                supabase_client.table("anchors").insert(anchor_rows).execute()
    except Exception as db_err:
        print(f"Supabase background sync notice: {db_err}")

@app.get("/api/health")
def health_check():
    key = os.getenv("SERPAPI_KEY")
    return {
        "status": "healthy",
        "has_serpapi_key": bool(key and key.strip()),
        "has_supabase": bool(supabase_client is not None)
    }

@app.get("/api/history")
def get_analysis_history(limit: int = 10):
    if not supabase_client:
        return {"status": "skipped", "message": "Supabase not configured", "data": []}
    try:
        res = supabase_client.table("event_analyses").select("*").order("created_at", desc=True).limit(limit).execute()
        return {"status": "success", "data": res.data or []}
    except Exception as e:
        return {"status": "error", "message": str(e), "data": []}

@app.post("/api/analyze")
def analyze_sponsorship_opportunity(
    req: EventAnalysisRequest,
    background_tasks: BackgroundTasks,
    api_key_header: str | None = None
):
    current_key = api_key_header or os.getenv("SERPAPI_KEY")
    if not current_key or not current_key.strip():
        raise HTTPException(
            status_code=500, 
            detail="SERPAPI_KEY not configured in backend .env or header. Please configure your SerpApi key."
        )
        
    api_client = serpapi.Client(api_key=current_key)
        
    try:
        # Run both Google Maps queries CONCURRENTLY in parallel threads to cut latency in half
        with ThreadPoolExecutor(max_workers=2) as executor:
            future_sponsors = executor.submit(
                api_client.search,
                {
                    "engine": "google_maps",
                    "q": "cafe gym bakery boutique shop store",
                    "ll": f"@{req.lat},{req.lng},15z",
                    "type": "search"
                }
            )
            future_anchors = executor.submit(
                api_client.search,
                {
                    "engine": "google_maps",
                    "q": "metro station university mall market landmark",
                    "ll": f"@{req.lat},{req.lng},14z",
                    "type": "search"
                }
            )
            sponsor_results = future_sponsors.result()
            anchor_results = future_anchors.result()
        
        # 1. Parse raw sponsors
        raw_sponsors = sponsor_results.get("local_results", [])
        clean_sponsors = []
        for place in raw_sponsors:
            reviews = place.get("reviews", 0)
            rating = place.get("rating", 0.0)
            score = round((reviews * rating) / 10, 2)
            
            clean_sponsors.append({
                "name": place.get("title"),            # Raw title only
                "address": place.get("address"),        # Raw address only
                "rating": rating,
                "reviews": reviews,
                "category": place.get("type", "Local Business"),
                "score": score,
                "match_rate": min(int(rating * 20), 99) if rating else 75,
                "phone": place.get("phone", "N/A"),
                "website": place.get("website", "N/A"),
                "thumbnail": place.get("thumbnail", "")
            })
            
        sponsors = sorted(clean_sponsors, key=lambda x: x["score"], reverse=True)[:5]
        
        # 2. Parse raw anchors
        raw_anchors = anchor_results.get("local_results", [])
        clean_anchors = []
        for place in raw_anchors:
            reviews = place.get("reviews", 0)
            if reviews > 30:
                clean_anchors.append({
                    "name": place.get("title"),         # Raw title only
                    "address": place.get("address"),     # Raw address only
                    "category": place.get("type", "Anchor Point"),
                    "rating": place.get("rating", 0.0),
                    "reviews": reviews,
                    "thumbnail": place.get("thumbnail", "")
                })
                
        anchors = sorted(clean_anchors, key=lambda x: x["reviews"], reverse=True)[:4]
        
        # 3. Synchronize with Supabase in background (Non-blocking high performance)
        if supabase_client:
            background_tasks.add_task(
                sync_supabase_background,
                req.model_dump(),
                sponsors,
                anchors
            )

        return {
            "status": "success",
            "sponsors": sponsors,
            "anchors": anchors
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
