FROM node:19.9.0

WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN yarn

RUN mkdir ./src
COPY ./src ./src

CMD ["yarn", "start:dev"]
