FROM node:12.11.0

WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN npm install

RUN mkdir ./src
COPY ./src ./src

CMD ["yarn", "start:dev"]