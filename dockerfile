FROM node:22-alpine3.19

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

ARG ENVIRONMENT
ENV ENVIRONMENT=${ENVIRONMENT}

RUN npm install -g pm2

COPY package*.json ./
RUN npm install

COPY . .

NODE_OPTIONS="--max-old-space-size=4096" 
RUN npm run build

# Change ownership of the application directory to the new user
RUN chown -R appuser:appgroup /app

# Switch to the new user
USER appuser

EXPOSE 3000

CMD ["pm2-runtime", "ecosystem.config.js"]