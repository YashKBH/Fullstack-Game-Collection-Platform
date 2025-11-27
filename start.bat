@echo off
REM ALL FOR ONE - Startup Script for Windows

echo 🎮 Starting ALL FOR ONE Platform...

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

REM Navigate to backend directory
cd backend

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing backend dependencies...
    call npm install
)

REM Start backend server
echo 🚀 Starting backend server on port 3000...
echo 📊 API will be available at: http://localhost:3000/api
echo 🏥 Health check: http://localhost:3000/health
echo.
echo 💡 To view the game, open index.html in a web browser
echo 💡 To view the dashboard, open dashboard/index.html in a web browser
echo.
echo Press Ctrl+C to stop the server
echo.

call npm start

