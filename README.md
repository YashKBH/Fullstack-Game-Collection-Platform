# ALL FOR ONE - Full-Stack Game Collection Platform

A complete end-to-end game collection platform demonstrating full-stack ownership with frontend, backend, and DevOps integration.

## 🎮 Overview

ALL FOR ONE is a collection of simple games with a comprehensive analytics and management system. This project showcases:

- **Frontend**: Modern web interface with Unity WebGL game integration
- **Backend**: RESTful API with SQLite database
- **DevOps**: Docker containerization, Nginx reverse proxy, health checks
- **Analytics**: Real-time game statistics, leaderboards, and event tracking

## 🏗️ Architecture

```
┌─────────────────┐
│   Frontend       │
│  (HTML/CSS/JS)   │
│  Unity WebGL     │
└────────┬─────────┘
         │
         │ HTTP/REST
         │
┌────────▼─────────┐
│   Backend API    │
│   (Express.js)   │
│   Port: 3000     │
└────────┬─────────┘
         │
         │ SQLite
         │
┌────────▼─────────┐
│   Database       │
│   (SQLite)       │
└─────────────────┘
```

## 📁 Project Structure

```
AllForOne-main/
├── backend/                 # Backend API server
│   ├── routes/             # API route handlers
│   │   ├── games.js       # Game management endpoints
│   │   ├── scores.js      # Score/leaderboard endpoints
│   │   └── analytics.js   # Analytics endpoints
│   ├── database.js        # Database initialization
│   ├── server.js          # Express server
│   └── package.json       # Node.js dependencies
├── dashboard/              # Analytics dashboard
│   ├── index.html         # Dashboard UI
│   ├── styles.css         # Dashboard styles
│   ├── dashboard.js       # Dashboard logic
│   └── api.js             # API client
├── Build/                 # Unity WebGL build files
├── TemplateData/          # Unity template assets
├── index.html             # Main game page
├── game-api.js            # Game API integration
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose setup
├── nginx.conf             # Nginx reverse proxy config
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose (optional, for containerized deployment)

### Local Development

1. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Start Backend Server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

3. **Open Game**
   - Open `index.html` in a web browser
   - Or use a local server: `python -m http.server 8080`

4. **Open Dashboard**
   - Navigate to `dashboard/index.html` in a web browser
   - Or access via: `http://localhost:8080/dashboard/`

### Docker Deployment

1. **Build and Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **Access Services**
   - Game: `http://localhost:80`
   - Dashboard: `http://localhost:80/dashboard/`
   - API: `http://localhost:3000/api`

3. **View Logs**
   ```bash
   docker-compose logs -f backend
   ```

4. **Stop Services**
   ```bash
   docker-compose down
   ```

## 📡 API Endpoints

### Games

- `GET /api/games` - Get all games
- `GET /api/games/:id` - Get game by ID
- `POST /api/games` - Create new game
- `PUT /api/games/:id` - Update game
- `DELETE /api/games/:id` - Delete game
- `GET /api/games/:id/stats` - Get game statistics
- `POST /api/games/:id/sessions` - Start game session

### Scores

- `POST /api/scores` - Submit score
- `GET /api/scores/leaderboard` - Get leaderboard
- `GET /api/scores/player/:name` - Get player scores
- `GET /api/scores/stats` - Get score statistics

### Analytics

- `POST /api/analytics/events` - Track analytics event
- `GET /api/analytics/summary` - Get analytics summary
- `GET /api/analytics/metrics` - Get real-time metrics
- `GET /api/analytics/timeline` - Get event timeline

### Health

- `GET /health` - Health check endpoint

## 🎯 Features

### Frontend
- ✅ Modern, responsive UI design
- ✅ Unity WebGL game integration
- ✅ Real-time API communication
- ✅ Session tracking
- ✅ Score submission
- ✅ Analytics event tracking

### Backend
- ✅ RESTful API design
- ✅ SQLite database with proper schema
- ✅ Error handling and validation
- ✅ Rate limiting
- ✅ Security headers (Helmet)
- ✅ CORS configuration
- ✅ Health checks

### DevOps
- ✅ Docker containerization
- ✅ Docker Compose orchestration
- ✅ Nginx reverse proxy (optional)
- ✅ Health check monitoring
- ✅ Environment configuration
- ✅ Production-ready setup

### Analytics Dashboard
- ✅ Real-time statistics
- ✅ Game management interface
- ✅ Leaderboard visualization
- ✅ Event timeline
- ✅ Metrics dashboard

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:8080
API_URL=http://localhost:3000/api
```

### API Configuration

Update `game-api.js` and `dashboard/api.js` to point to your API URL:

```javascript
const API_BASE_URL = process.env.API_URL || 'http://localhost:3000/api';
```

## 🧪 Testing

### Manual Testing

1. **Test API Health**
   ```bash
   curl http://localhost:3000/health
   ```

2. **Create a Game**
   ```bash
   curl -X POST http://localhost:3000/api/games \
     -H "Content-Type: application/json" \
     -d '{"name":"Test Game","description":"A test game","category":"Puzzle"}'
   ```

3. **Submit a Score**
   ```bash
   curl -X POST http://localhost:3000/api/scores \
     -H "Content-Type: application/json" \
     -d '{"game_id":1,"player_name":"TestPlayer","score":1000}'
   ```

## 📊 Database Schema

- **games**: Game information
- **sessions**: Game session tracking
- **scores**: Player scores and leaderboards
- **analytics_events**: Event tracking for analytics

## 🔒 Security Features

- Helmet.js for security headers
- Rate limiting on API endpoints
- CORS configuration
- Input validation
- SQL injection prevention (parameterized queries)

## 🚢 Deployment

### Production Deployment

1. **Build Docker Image**
   ```bash
   docker build -t all-for-one:latest .
   ```

2. **Run with Docker Compose (Production Profile)**
   ```bash
   docker-compose --profile production up -d
   ```

3. **Environment Variables**
   - Set `NODE_ENV=production`
   - Configure `FRONTEND_URL` for your domain
   - Set up SSL/TLS certificates for HTTPS

## 📝 Development Notes

- Backend uses SQLite for simplicity (can be upgraded to PostgreSQL/MySQL)
- Frontend uses vanilla JavaScript (no framework dependencies)
- API follows RESTful conventions
- Error handling is implemented throughout
- Code is organized with separation of concerns

## 🎨 Design Philosophy

- **Clean Interfaces**: RESTful API with consistent response formats
- **Reliable APIs**: Error handling, validation, and rate limiting
- **Sound Engineering**: Proper separation of concerns, modular design
- **End-to-End Ownership**: Full control from frontend to backend to deployment

## 📄 License

MIT License - See LICENSE file for details

## 👤 Author

Karen Cadavos

---

**Built with ❤️ to demonstrate full-stack engineering capabilities**

