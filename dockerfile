# Build stage
FROM --platform=linux/arm64 node:18-alpine AS builder

WORKDIR /App

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM --platform=linux/arm64 node:18-alpine

WORKDIR /App

COPY --from=builder /App/package*.json ./
COPY --from=builder /App/.next ./.next
COPY --from=builder /App/public ./public
COPY --from=builder /App/node_modules ./node_modules

ENV ENVIRONMENT=${ENVIRONMENT}
ENV NEXT_PUBLIC_API_BASE_URL=http://43.204.236.103:8000

RUN npm install -g pm2

EXPOSE 80

CMD ["pm2-runtime", "ecosystem.config.js"]