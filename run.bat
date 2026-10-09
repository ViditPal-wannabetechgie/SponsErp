@echo off
title SponsErp Launcher
echo ========================================================
echo   Launching SponsErp Hyper-Local Sponsorship Platform
echo ========================================================
echo.
echo [1/2] Starting FastAPI Backend on http://127.0.0.1:8000 ...
start "SponsErp Backend (FastAPI)" cmd /k "cd /d %~dp0backend && python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000"

echo [2/2] Starting Next.js Frontend on http://localhost:3000 ...
start "SponsErp Frontend (Next.js)" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ========================================================
echo   Both services are now running!
echo   - Frontend: http://localhost:3000
echo   - Backend:  http://127.0.0.1:8000
echo ========================================================
echo You can keep this window or close it. To stop the servers,
echo simply close the two opened terminal windows.
echo.
pause
