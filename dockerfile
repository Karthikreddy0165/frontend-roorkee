# Use the official Node.js image as the base image
FROM node:22-alpine3.19

# Set working directory inside the container
WORKDIR /app

# Create a new group and user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Accept the build environment as an argument, which can be passed at build time
ARG ENVIRONMENT
ENV ENVIRONMENT=${ENVIRONMENT}

# Install pm2 globally
RUN npm install -g pm2

# Copy package.json and package-lock.json to install dependencies first
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Set NODE_OPTIONS environment variable to increase memory limit
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build the application (only if you are using a build step like for React, Angular, etc.)
RUN npm run build

# Change ownership of the application directory to the appuser for security
RUN chown -R appuser:appgroup /app

# Switch to the new user for security reasons (non-root user)
USER appuser

# Expose the port your app will run on
EXPOSE 3000

# Start the application using pm2-runtime (for production)
CMD ["pm2-runtime", "ecosystem.config.js"]
