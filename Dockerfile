# Use Node.js 18 Alpine (lightweight)
FROM node:18-alpine

# Install build dependencies for better-sqlite3 and native modules
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    sqlite \
    sqlite-dev \
    build-base \
    linux-headers

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with better error handling
RUN npm ci --production --verbose 2>&1 || \
    npm install --production --legacy-peer-deps --verbose 2>&1 || \
    (npm cache clean --force && npm install --production --verbose 2>&1)

# Copy application files
COPY . .

# Explicitly ensure views folder is copied
COPY views ./views

# Create uploads directory with proper permissions
RUN mkdir -p uploads && chmod 777 uploads

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Use /app/uploads for ephemeral storage (Free Plan)
# Or /data/uploads if Volume is mounted (Hobby Plan)
ENV UPLOADS_DIR=/app/uploads

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start application with error logging
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh
CMD ["/app/start.sh"]
