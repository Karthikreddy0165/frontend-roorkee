# Build stage
FROM --platform=linux/arm64 node:18-alpine AS builder

WORKDIR /App

# Only copy package files first to leverage Docker cache
COPY package*.json ./
RUN npm ci

# Copy application source code (this will only trigger rebuild if source code changes)
COPY . .

# Run build command to generate production build
RUN npm run build

# Production stage
FROM --platform=linux/arm64 node:18-alpine

WORKDIR /App

# Copy package.json and package-lock.json from builder (from cache)
COPY --from=builder /App/package*.json ./

# Copy the build output, public folder, node_modules, and ecosystem.config.js from builder
COPY --from=builder /App/.next ./.next
COPY --from=builder /App/public ./public
COPY --from=builder /App/node_modules ./node_modules
COPY --from=builder /App/ecosystem.config.js ./  # Copy the ecosystem.config.js file

# Set environment variables
ENV ENVIRONMENT=${ENVIRONMENT}
ENV NEXT_PUBLIC_API_BASE_URL=http://43.204.236.103:8000

# Install PM2 globally
RUN npm install -g pm2

# Expose port 80
EXPOSE 80

# Start the app using PM2
CMD ["pm2-runtime", "ecosystem.config.js"]
