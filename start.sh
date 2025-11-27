#!/bin/bash

# ALL FOR ONE - Startup Script

echo "🎮 Starting ALL FOR ONE Platform..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Navigate to backend directory
cd backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

# Start backend server
echo "🚀 Starting backend server on port 3000..."
echo "📊 API will be available at: http://localhost:3000/api"
echo "🏥 Health check: http://localhost:3000/health"
echo ""
echo "💡 To view the game, open index.html in a web browser"
echo "💡 To view the dashboard, open dashboard/index.html in a web browser"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm start

