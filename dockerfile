# Build stage
FROM --platform=linux/arm64 node:18-alpine AS builder

WORKDIR /App

# ARG variables for build time configuration
ARG ENVIRONMENT
ARG NEXT_PUBLIC_API_BASE_URL

# Set runtime environment variables
ENV ENVIRONMENT=${ENVIRONMENT}
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

# Install PM2 locally
RUN npm install pm2 --save

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application files
COPY . .

# Build the Next.js application
RUN npm run build

# Production stage
FROM --platform=linux/arm64 node:18-alpine

WORKDIR /App

# Copy the built app and node_modules from the builder stage
COPY --from=builder /App/package*.json ./
COPY --from=builder /App/.next ./.next
COPY --from=builder /App/node_modules ./node_modules

# Set runtime environment variables
ENV ENVIRONMENT=${ENVIRONMENT}
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

# Use PM2 locally via npx
CMD ["npx", "pm2-runtime", "ecosystem.config.js"]
