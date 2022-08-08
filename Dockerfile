FROM --platform=amd64 node:16-alpine

WORKDIR /app

COPY ./ .

RUN npm i

EXPOSE 3000
CMD npm run start
