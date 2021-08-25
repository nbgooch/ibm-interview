FROM node:14-alpine as builder

WORKDIR /app
COPY ./package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE  4020

ENTRYPOINT npm run start:prod
