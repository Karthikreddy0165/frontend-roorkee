FROM node:22-alpine3.19

WORKDIR /App

ARG ENVIRONMENT
ENV ENVIRONMENT=${ENVIRONMENT}

RUN npm install -g pm2

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 80

CMD ["pm2-runtime", "ecosystem.config.js"]