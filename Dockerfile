# Multi-stage build for ALL FOR ONE application

# Stage 1: Backend
FROM node:18-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --only=production

# Stage 2: Final image
FROM node:18-alpine
WORKDIR /app

# Install production dependencies for backend
COPY --from=backend-builder /app/backend/node_modules ./backend/node_modules
COPY backend/ ./backend/

# Copy frontend files
COPY index.html ./
COPY game-api.js ./
COPY manifest.webmanifest ./
COPY ServiceWorker.js ./
COPY TemplateData/ ./TemplateData/
COPY Build/ ./Build/
COPY dashboard/ ./dashboard/

# Create data directory for SQLite
RUN mkdir -p /app/backend/data

# Expose ports
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV FRONTEND_URL=*

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start backend server
WORKDIR /app/backend
CMD ["node", "server.js"]

