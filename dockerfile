# Use a lightweight Node.js image
FROM node:22-alpine3.19

# Set the working directory
WORKDIR /app

# Set environment variables dynamically
ARG ENVIRONMENT
ENV ENVIRONMENT=${ENVIRONMENT}

# Install pm2 globally
RUN npm install -g pm2

# Copy package.json and package-lock.json for dependencies installation
COPY package*.json ./

# Install dependencies
RUN npm install --production 

# Copy the entire project into the container
COPY . .

# Build the application (if applicable, e.g., for React or Next.js)
RUN npm run build

# Expose the port your application listens on
EXPOSE 80

# Set the default command to start the app with pm2
CMD ["pm2-runtime", "ecosystem.config.js"]
