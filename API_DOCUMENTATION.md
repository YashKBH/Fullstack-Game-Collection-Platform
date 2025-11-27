# ALL FOR ONE API Documentation

Complete API reference for the ALL FOR ONE game collection platform.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Currently, the API does not require authentication. In production, consider adding JWT tokens or API keys.

## Response Format

All responses are in JSON format. Success responses follow this structure:

```json
{
  "data": { ... }
}
```

Error responses:

```json
{
  "error": {
    "message": "Error description",
    "status": 400
  }
}
```

## Games API

### Get All Games

**GET** `/api/games`

Returns a list of all games.

**Response:**
```json
{
  "games": [
    {
      "id": 1,
      "name": "Game Name",
      "description": "Game description",
      "category": "Puzzle",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Game by ID

**GET** `/api/games/:id`

Returns a specific game.

**Parameters:**
- `id` (path) - Game ID

**Response:**
```json
{
  "game": {
    "id": 1,
    "name": "Game Name",
    "description": "Game description",
    "category": "Puzzle",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### Create Game

**POST** `/api/games`

Creates a new game.

**Request Body:**
```json
{
  "name": "Game Name",
  "description": "Game description",
  "category": "Puzzle"
}
```

**Required Fields:**
- `name` (string) - Game name

**Response:**
```json
{
  "game": {
    "id": 1,
    "name": "Game Name",
    "description": "Game description",
    "category": "Puzzle"
  }
}
```

### Update Game

**PUT** `/api/games/:id`

Updates an existing game.

**Parameters:**
- `id` (path) - Game ID

**Request Body:**
```json
{
  "name": "Updated Game Name",
  "description": "Updated description",
  "category": "Action"
}
```

**Response:**
```json
{
  "message": "Game updated successfully"
}
```

### Delete Game

**DELETE** `/api/games/:id`

Deletes a game.

**Parameters:**
- `id` (path) - Game ID

**Response:**
```json
{
  "message": "Game deleted successfully"
}
```

### Get Game Statistics

**GET** `/api/games/:id/stats`

Returns statistics for a specific game.

**Parameters:**
- `id` (path) - Game ID

**Response:**
```json
{
  "game_id": 1,
  "statistics": {
    "totalSessions": { "count": 10 },
    "totalScores": { "count": 50 },
    "averageScore": { "avg": 1250.5 },
    "highScore": { "max": 5000 },
    "recentScores": [ ... ]
  }
}
```

### Start Game Session

**POST** `/api/games/:id/sessions`

Starts a new game session.

**Parameters:**
- `id` (path) - Game ID

**Response:**
```json
{
  "session": {
    "id": "uuid-string",
    "game_id": 1,
    "start_time": "2024-01-01T00:00:00.000Z"
  }
}
```

## Scores API

### Submit Score

**POST** `/api/scores`

Submits a new score.

**Request Body:**
```json
{
  "session_id": "uuid-string",
  "game_id": 1,
  "player_name": "PlayerName",
  "score": 1000,
  "level": 5,
  "metadata": {
    "custom": "data"
  }
}
```

**Required Fields:**
- `game_id` (integer) - Game ID
- `score` (integer) - Score value

**Response:**
```json
{
  "score": {
    "id": 1,
    "game_id": 1,
    "player_name": "PlayerName",
    "score": 1000,
    "level": 5,
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### Get Leaderboard

**GET** `/api/scores/leaderboard`

Returns the leaderboard.

**Query Parameters:**
- `game_id` (optional) - Filter by game ID
- `limit` (optional, default: 10) - Number of results

**Example:**
```
GET /api/scores/leaderboard?game_id=1&limit=20
```

**Response:**
```json
{
  "leaderboard": [
    {
      "id": 1,
      "player_name": "PlayerName",
      "score": 5000,
      "level": 10,
      "game_name": "Game Name",
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Player Scores

**GET** `/api/scores/player/:name`

Returns scores for a specific player.

**Parameters:**
- `name` (path) - Player name

**Query Parameters:**
- `game_id` (optional) - Filter by game ID
- `limit` (optional, default: 20) - Number of results

**Response:**
```json
{
  "player": "PlayerName",
  "scores": [
    {
      "id": 1,
      "score": 1000,
      "game_name": "Game Name",
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Score Statistics

**GET** `/api/scores/stats`

Returns overall score statistics.

**Query Parameters:**
- `game_id` (optional) - Filter by game ID

**Response:**
```json
{
  "statistics": {
    "total_scores": 100,
    "average_score": 1250.5,
    "high_score": 5000,
    "low_score": 100,
    "unique_players": 25
  }
}
```

## Analytics API

### Track Event

**POST** `/api/analytics/events`

Tracks an analytics event.

**Request Body:**
```json
{
  "session_id": "uuid-string",
  "game_id": 1,
  "event_type": "level_complete",
  "event_data": {
    "level": 5,
    "time_taken": 120
  }
}
```

**Required Fields:**
- `event_type` (string) - Event type identifier

**Response:**
```json
{
  "event": {
    "id": 1,
    "event_type": "level_complete",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### Get Analytics Summary

**GET** `/api/analytics/summary`

Returns analytics summary.

**Query Parameters:**
- `start_date` (optional) - Start date (YYYY-MM-DD)
- `end_date` (optional) - End date (YYYY-MM-DD)
- `game_id` (optional) - Filter by game ID

**Response:**
```json
{
  "analytics": [
    {
      "event_type": "level_complete",
      "count": 50,
      "date": "2024-01-01"
    }
  ]
}
```

### Get Real-Time Metrics

**GET** `/api/analytics/metrics`

Returns real-time analytics metrics.

**Query Parameters:**
- `period` (optional, default: 24) - Time period in hours

**Response:**
```json
{
  "period_hours": 24,
  "metrics": {
    "totalEvents": { "count": 100 },
    "eventsByType": [
      {
        "event_type": "level_complete",
        "count": 50
      }
    ],
    "activeSessions": { "count": 5 },
    "topGames": [
      {
        "name": "Game Name",
        "event_count": 30
      }
    ]
  }
}
```

### Get Event Timeline

**GET** `/api/analytics/timeline`

Returns recent events timeline.

**Query Parameters:**
- `limit` (optional, default: 100) - Number of events

**Response:**
```json
{
  "events": [
    {
      "id": 1,
      "session_id": "uuid-string",
      "game_id": 1,
      "game_name": "Game Name",
      "event_type": "level_complete",
      "event_data": { ... },
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## Health Check

### Health Check

**GET** `/health`

Returns API health status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "ALL FOR ONE API",
  "version": "1.0.0"
}
```

## Error Codes

- `400` - Bad Request (invalid input)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (duplicate resource)
- `500` - Internal Server Error

## Rate Limiting

API endpoints are rate-limited to 100 requests per 15 minutes per IP address.

## CORS

CORS is enabled for all origins by default. In production, configure `FRONTEND_URL` environment variable to restrict origins.

## Examples

### Complete Game Flow

1. **Start Session**
   ```bash
   curl -X POST http://localhost:3000/api/games/1/sessions
   ```

2. **Track Event**
   ```bash
   curl -X POST http://localhost:3000/api/analytics/events \
     -H "Content-Type: application/json" \
     -d '{"session_id":"uuid","game_id":1,"event_type":"game_start"}'
   ```

3. **Submit Score**
   ```bash
   curl -X POST http://localhost:3000/api/scores \
     -H "Content-Type: application/json" \
     -d '{"session_id":"uuid","game_id":1,"player_name":"Player","score":1000}'
   ```

4. **View Leaderboard**
   ```bash
   curl http://localhost:3000/api/scores/leaderboard?game_id=1&limit=10
   ```

