# Use the official Node.js image as base
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S sveltekit -u 1001

# Copy built application from builder stage
COPY --from=builder --chown=sveltekit:nodejs /app/build build/
COPY --from=builder --chown=sveltekit:nodejs /app/node_modules node_modules/
COPY --from=builder --chown=sveltekit:nodejs /app/package.json .
COPY --from=builder --chown=sveltekit:nodejs /app/static static/

# Switch to non-root user
USER sveltekit

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Start the application
CMD ["node", "build"]