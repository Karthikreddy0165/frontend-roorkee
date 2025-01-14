# Stage 1: Build for ARM64
FROM --platform=linux/arm64 node:18-alpine3.16 as builder

# Set the working directory inside the container
WORKDIR /App

# Copy the application files into the container
COPY . .

# Install the necessary dependencies globally (for ARM64 platform)
RUN npm install -g pm2

# Install the app dependencies
RUN npm install

# Stage 2: Final ARM64-compatible image
FROM --platform=linux/arm64 node:18-alpine3.16

# Set the working directory inside the container
WORKDIR /App

# Copy the app and dependencies from the builder stage
COPY --from=builder /App /App

# Expose the port your app will run on (optional)
EXPOSE 3000

# Command to run your application (adjust as necessary)
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
