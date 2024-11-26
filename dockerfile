# Stage 1: Build stage
FROM node:22-alpine3.19 AS build

# Set working directory
WORKDIR /app

# Set memory limits for Node.js
ENV NODE_OPTIONS=--max_old_space_size=2048

# Set environment variables dynamically
ARG ENVIRONMENT
ENV ENVIRONMENT=${ENVIRONMENT}

# Install global dependencies (pm2 only in production stage if necessary)
RUN npm install -g npm@latest

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Clean install dependencies, avoiding unnecessary files
RUN npm ci --silent && npm cache clean --force

# Copy the entire project
COPY . .

# Build the app with memory optimization
RUN npm run build

# Stage 2: Production stage
FROM node:22-alpine3.19 AS production

# Set working directory
WORKDIR /app

# Install pm2 in production stage (optional, only if you want process management)
RUN npm install -g pm2

# Copy necessary files and build artifacts from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules

# Only copy 'public' directory if it exists
COPY --from=build /app/public ./public || true

# Expose the application port
EXPOSE 3000

# Use pm2 to manage the application (or `next start` if PM2 is not required)
CMD ["pm2-runtime", "start", "npm", "--", "run", "start"]
