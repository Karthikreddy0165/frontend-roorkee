# Use ARM64-compatible base image
FROM --platform=linux/arm64 node:18-alpine3.16 as builder

# Set the working directory
WORKDIR /App

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install pm2 locally instead of globally
RUN npm install pm2

# Copy the rest of the application code
COPY . .

# Build your application (if needed, replace with the correct build command)
# RUN npm run build

# Stage 2: Use a clean image for production
FROM --platform=linux/arm64 node:18-alpine3.16 as stage-1

# Set the working directory for the production stage
WORKDIR /App

# Copy dependencies from the builder stage
COPY --from=builder /App /App

# Expose the app's port (adjust as per your app's configuration)
EXPOSE 3000

# Use pm2-runtime to run the app (adjust to your app's entry point)
CMD ["./node_modules/.bin/pm2-runtime", "start", "ecosystem.config.js"]
