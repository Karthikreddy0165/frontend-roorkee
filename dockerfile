# Build stage
FROM --platform=linux/amd64 node:18-buster AS builder

WORKDIR /App

# Set environment variables
ARG ENVIRONMENT
ARG NEXT_PUBLIC_API_BASE_URL
ENV ENVIRONMENT=${ENVIRONMENT}
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

# Install PM2 locally
RUN npm install pm2 --save

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application files
COPY . .

# Build the Next.js application
RUN npm run build

# Production stage
FROM --platform=linux/amd64 node:18-buster

WORKDIR /App

# Copy the build and node_modules from the builder stage
COPY --from=builder /App/package*.json ./
COPY --from=builder /App/.next ./.next
COPY --from=builder /App/node_modules ./node_modules

# Set runtime environment variables
ENV ENVIRONMENT=${ENVIRONMENT}
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

# Use PM2 locally via npx
CMD ["npx", "pm2-runtime", "ecosystem.config.js"]
