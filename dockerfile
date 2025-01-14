# Build stage
FROM --platform=linux/arm64 node:18-alpine AS builder

WORKDIR /App

ARG ENVIRONMENT
ARG NEXT_PUBLIC_API_BASE_URL
ENV ENVIRONMENT=${ENVIRONMENT}

ENV NEXT_PUBLIC_API_BASE_URL=http://43.204.236.103:8000

RUN npm install -g pm2

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build 

EXPOSE 80

CMD ["pm2-runtime", "ecosystem.config.js"]