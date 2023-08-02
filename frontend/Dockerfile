# Stage 1
FROM node:16.13.1 AS installation

WORKDIR /base

COPY ./package.json /base/package.json
COPY . /base
RUN npm install
RUN npm install -g serve


FROM installation as build
RUN npm run build

