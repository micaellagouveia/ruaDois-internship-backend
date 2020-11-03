FROM node:12-stretch-slim

WORKDIR /api

COPY package.json .

RUN yarn install

CMD ["yarn", "start"]
