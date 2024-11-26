# Use a lightweight Node.js image
FROM node:22-alpine3.19

# Set working directory
WORKDIR /app

# Set memory limits for Node.js
ENV NODE_OPTIONS=--max_old_space_size=2048

# Set environment variables dynamically
ARG ENVIRONMENT
ENV ENVIRONMENT=${ENVIRONMENT}

# Install global dependencies
RUN npm install -g pm2 npm@latest

# Copy only necessary files for dependency installation
COPY package*.json ./

# Clean install dependencies, avoiding unnecessary files
RUN npm ci --only=production --silent \
    && npm cache clean --force

# Copy project files
COPY . .

# Build with memory optimization
RUN npm run build

# Expose application port
EXPOSE 3000

# Use multi-stage build optimization (optional but recommended)
FROM node:22-alpine3.19
WORKDIR /app

# Copy only necessary artifacts
COPY --from=0 /app/package*.json ./
COPY --from=0 /app/.next ./.next
COPY --from=0 /app/public ./public
COPY --from=0 /app/node_modules ./node_modules

# Install pm2
RUN npm install -g pm2

# Use pm2 to manage application
CMD ["pm2-runtime", "ecosystem.config.js"]