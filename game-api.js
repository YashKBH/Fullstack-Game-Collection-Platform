// Game API Integration for Unity WebGL
// This script provides API integration for the Unity game

const API_BASE_URL = process.env.API_URL || 'http://localhost:3000/api';

class GameAPI {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.currentSessionId = null;
    this.currentGameId = 1; // Default game ID, can be configured
    this.playerName = this.getPlayerName();
  }

  getPlayerName() {
    // Try to get player name from localStorage or prompt
    let name = localStorage.getItem('playerName');
    if (!name) {
      name = prompt('Enter your player name (or leave blank for anonymous):') || 'Anonymous';
      if (name) {
        localStorage.setItem('playerName', name);
      }
    }
    return name;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: { message: 'Request failed' } }));
        throw new Error(error.error?.message || `HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.warn('API request failed:', error.message);
      // Fail silently for game - don't interrupt gameplay
      return null;
    }
  }

  // Start a game session
  async startSession(gameId = null) {
    const game = gameId || this.currentGameId;
    try {
      const response = await this.request(`/games/${game}/sessions`, {
        method: 'POST',
      });
      if (response && response.session) {
        this.currentSessionId = response.session.id;
        this.currentGameId = game;
        
        // Track session start event
        this.trackEvent('session_start', {
          game_id: game,
          session_id: this.currentSessionId,
        });
        
        return this.currentSessionId;
      }
    } catch (error) {
      console.warn('Failed to start session:', error);
    }
    return null;
  }

  // End a game session
  async endSession() {
    if (!this.currentSessionId) return;
    
    try {
      // Calculate duration
      const startTime = new Date();
      // In a real implementation, you'd track the start time
      
      this.trackEvent('session_end', {
        session_id: this.currentSessionId,
        game_id: this.currentGameId,
      });
      
      this.currentSessionId = null;
    } catch (error) {
      console.warn('Failed to end session:', error);
    }
  }

  // Submit a score
  async submitScore(score, level = null, metadata = {}) {
    if (!this.currentSessionId) {
      // Auto-start session if not started
      await this.startSession();
    }
    
    try {
      const response = await this.request('/scores', {
        method: 'POST',
        body: {
          session_id: this.currentSessionId,
          game_id: this.currentGameId,
          player_name: this.playerName,
          score: score,
          level: level,
          metadata: metadata,
        },
      });
      
      if (response && response.score) {
        this.trackEvent('score_submitted', {
          score: score,
          level: level,
        });
        return response.score;
      }
    } catch (error) {
      console.warn('Failed to submit score:', error);
    }
    return null;
  }

  // Track analytics event
  async trackEvent(eventType, eventData = {}) {
    try {
      await this.request('/analytics/events', {
        method: 'POST',
        body: {
          session_id: this.currentSessionId,
          game_id: this.currentGameId,
          event_type: eventType,
          event_data: eventData,
        },
      });
    } catch (error) {
      // Silently fail - don't interrupt gameplay
      console.warn('Failed to track event:', error);
    }
  }

  // Get leaderboard
  async getLeaderboard(gameId = null, limit = 10) {
    try {
      const game = gameId || this.currentGameId;
      const response = await this.request(`/scores/leaderboard?game_id=${game}&limit=${limit}`);
      return response?.leaderboard || [];
    } catch (error) {
      console.warn('Failed to get leaderboard:', error);
      return [];
    }
  }

  // Get player's best score
  async getPlayerBestScore(gameId = null) {
    try {
      const game = gameId || this.currentGameId;
      const response = await this.request(`/scores/player/${encodeURIComponent(this.playerName)}?game_id=${game}&limit=1`);
      const scores = response?.scores || [];
      return scores.length > 0 ? scores[0] : null;
    } catch (error) {
      console.warn('Failed to get player best score:', error);
      return null;
    }
  }
}

// Create global instance
const gameAPI = new GameAPI();

// Expose to Unity via window object
window.gameAPI = gameAPI;

// Auto-start session when page loads
window.addEventListener('load', () => {
  // Small delay to ensure Unity is ready
  setTimeout(() => {
    gameAPI.startSession().then(() => {
      console.log('Game session started');
    });
  }, 1000);
});

// End session when page unloads
window.addEventListener('beforeunload', () => {
  gameAPI.endSession();
});

// Example Unity integration functions
window.UnityGameAPI = {
  submitScore: (score, level, metadata) => {
    return gameAPI.submitScore(score, level, metadata);
  },
  trackEvent: (eventType, eventData) => {
    return gameAPI.trackEvent(eventType, eventData);
  },
  getLeaderboard: (gameId, limit) => {
    return gameAPI.getLeaderboard(gameId, limit);
  },
  getPlayerBestScore: (gameId) => {
    return gameAPI.getPlayerBestScore(gameId);
  },
  startSession: (gameId) => {
    return gameAPI.startSession(gameId);
  },
  endSession: () => {
    return gameAPI.endSession();
  },
};

