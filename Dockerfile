FROM --platform=amd64 node:16-alpine as builder

ARG DOCKER_ENV
ENV REACT_ENV=${DOCKER_ENV}

WORKDIR /app

COPY ./ .
RUN npm i --production=false \
  && npm run build

FROM --platform=amd64 node:16-alpine

WORKDIR /app

COPY --from=builder /app/build ./build
COPY package*.json ./

RUN npm i --production=true

EXPOSE 3000
CMD npm run serve
