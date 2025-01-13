# Use the ARM64-compatible Node.js image
FROM --platform=linux/arm64 node:22-alpine3.19

# Set the working directory
WORKDIR /App

# Pass environment variables
ARG ENVIRONMENT
ARG NEXT_PUBLIC_API_BASE_URL
ENV ENVIRONMENT=${ENVIRONMENT}
ENV NEXT_PUBLIC_API_BASE_URL=http://43.204.236.103:8000

# Install PM2 globally
RUN npm install -g pm2

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy the application source code
COPY . .

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 80

# Start the application using PM2 runtime
CMD ["pm2-runtime", "ecosystem.config.js"]
