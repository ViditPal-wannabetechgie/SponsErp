# 🌌 SponsErp — Micro-Sponsorship Intelligence Platform

> **Hyper-local B2B sponsorship intelligence engine connecting event organizers with high-converting local businesses and transit footfall hubs using real-time Google Maps coordinates.**

---

## 🚀 Overview

Event organizers struggle to monetize local events, relying on tedious manual outreach and guesswork. **SponsErp** transforms this experience into an automated, cinematic intelligence platform:
* **Real-Time Google Maps Ground Truth:** Queries verified local merchants and high-footfall "Anchor Hubs" (metro stations, universities, malls) via SerpApi with **zero synthetic data or hallucinations**.
* **Cinematic WebGL & Cosmic Design:** Immersive 3D interactive particle starfield with cursor parallax, ambient nebulae glow, and sleek glassmorphism inspired by high-end digital experiences.
* **Algorithmic Fit Scoring:** Automatic calculation of a 0–100% **Sponsor Match Score** based on review velocity, rating density, and geographic proximity.
* **Interactive ROI & Revenue Engine:** Real-time simulation demonstrating how event micro-sponsorship yields **up to 3.5× higher ROI and lower CPM** compared to Meta/Google digital ads.
* **One-Click Outreach Pitch & Brief Generator:** Pre-composed proposals with customizable tier pricing chips ($250, $500, $1,000, $2,500), CSV export, and instant copy/email dispatch.

---

## 🛠 Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion, Three.js / WebGL, Lucide Icons |
| **Backend** | Python 3.10+, FastAPI, Pydantic, SerpApi (`google_maps` engine), Uvicorn |
| **Database** | Supabase (PostgreSQL with async background tasks) |
| **Performance** | `ThreadPoolExecutor` parallel SerpApi querying, SSR-disabled dynamic WebGL rendering, GPU-accelerated transforms |

---

## 🌟 Key Features

### 1. 🎯 Zero-Hallucination Local Sponsor Discovery
Direct raw string consumption from Google Maps via SerpApi:
* Strict unedited place titles and verified addresses.
* Instant metrics: Google Star Rating, Verified Review Count, Category, Phone, and Website.

### 2. 🛡 Anchor Footfall Heat Indicators
Identifies nearby commercial traffic drivers (universities, transit lines, shopping complexes) with live density badges:
* `EXTREME DENSITY` (250+ reviews)
* `HIGH FOOTFALL` (100+ reviews)
* `COMMUTER CORRIDOR` (Verified baseline traffic)

### 3. 📊 Interactive Sponsor ROI & Value Engine
Empowers organizers with pitch-ready commercial proof:
* Interactive sliders for **Expected Attendees**, **Pitch Price**, and **Ticket Value**.
* Dynamic calculations for **Verified Local Impressions**, **Sponsor Event CPM**, and **Digital Ad Value Comparison**.

### 4. ⚡ Instant Outreach Generator & CSV Brief Exporter
* One-click customized proposal emails incorporating the exact neighborhood anchor name.
* Single-click clipboard copying, email client launch, and downloadable `.csv` sponsorship dossiers.

---

## 🏗 Architecture & Project Structure

```text
SponsErp/
├── backend/
│   ├── main.py              # FastAPI application with concurrent SerpApi execution
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # (Secret) SERPAPI_KEY & Supabase credentials
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js App Router (layout, page, globals.css)
│   │   ├── components/      # UI components (SpaceBackground, Dashboard, SponsorCard, RoiCalculator, etc.)
│   │   ├── context/         # AuthContext & ThemeContext
│   │   ├── lib/             # API clients and coordinate presets
│   │   └── types/           # Strict TypeScript interfaces
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── .gitignore               # Environment & build artifact protections
└── README.md                # Project documentation
```

---

## 🚦 Getting Started Locally

### Prerequisites
* **Node.js** (v18 or higher)
* **Python** (v3.10 or higher)
* A valid **SerpApi Key** (from [serpapi.com](https://serpapi.com))
* *(Optional)* A **Supabase** account for database persistence

---

### 1. Clone the Repository
```bash
git clone https://github.com/ViditPal-wannabetechgie/SponsErp.git
cd SponsErp
```

---

### 2. Backend Setup
```bash
cd backend

# Create and activate virtual environment (optional but recommended)
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create your .env file
# Add:
# SERPAPI_KEY=your_serpapi_key_here
# SUPABASE_URL=your_supabase_url (optional)
# SUPABASE_KEY=your_supabase_key (optional)

# Start backend server
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
Backend API docs available at: `http://127.0.0.1:8000/docs`

---

### 3. Frontend Setup
In a new terminal window:
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔒 Security & Privacy Guarantees
* **Protected Secrets:** All API keys and environment variables are strictly ignored via `.gitignore`.
* **Zero Scraping:** Exclusively uses verified Google Maps endpoints through official SerpApi APIs.
* **Strict B2B Authentication:** Clean account creation and login flows without guest or demo bypasses.

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.
