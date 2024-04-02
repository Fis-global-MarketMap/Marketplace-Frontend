FROM node:16-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn cache clean
RUN yarn install 
ENV REACT_APP_BACKEND_URL=http://192.168.181.128:32322
COPY . .
RUN yarn build

FROM nginx:1.19-alpine AS server
COPY ./etc/nginx.conf /etc/nginx/conf.d/default.conf
COPY build/ /usr/share/nginx/html
