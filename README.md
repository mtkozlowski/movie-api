# Movie API

### NestJS & MySQL Dockerized Application

![Docker Image Action badge](https://github.com/mtkozlowski/movie-api/actions/workflows/docker-image.yml/badge.svg)
![Node CI Action badge](https://github.com/mtkozlowski/movie-api/actions/workflows/node.js.yml/badge.svg)

## Description

This repository contains a simple NestJS-based Movie API application, which allows authorized users to add new movies to
its repository.

Movie API works with MySQL database and they can be both run in Docker network.

## Installation

```bash
$ yarn install
```

## Before running the app

Before running the app, make sure you have fullfilled following requirements:

- have `docker` and `docker-compose` installed
- have obtained free OMDb API key [here](http://www.omdbapi.com)
- have created `.env` file with following variables being set:
    - APP_PORT
    - OMBD_API_KEY
    - OMBD_HOST (which should be equal to: `http://www.omdbapi.com`)
    - JWT_SECRET

## Running the app

Once mentioned required are met, you can run from root dir following command:

```bash
docker-compose up -d
```

to start the application.

To stop it run:

```
docker-compose down
```

## Usage

While app is running you can execute following requests:

### Login

For `basic` user

```bash
curl --location --request POST 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "basic-thomas",
    "password": "sR-_pcoow-27-6PAwCD8"
}'
```

For `premium` user:

```bash
curl --location --request POST 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "premium-jim",
    "password": "GBLtTyq3E_UNjFnpo9m6"
}'
```

Received token use in Authorization Header with each further API call.

### GET `/movies`

Assuming the app is listening on port `3000`, you can call the API to retrieve user's movies:

```bash
curl --location --request GET 'http://localhost:3000/movies' \
--header 'Authorization: Bearer AUTH_TOKEN'
```

### POST `/movies`

By calling `/movies` API with movie title in request body, you can add a new movie to users list. However, `basic` user
is restricted to only be able to add 5 new movies per month. `Premium` user is not limited.

```bash
curl --location --request POST 'http://localhost:3000/movies' \
--header 'Authorization: Bearer AUTH_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Reservoir dogs"
}'
```

If you try to add a movie that already exists on your list, you should expect `ConflictException`.

## Test

![Node CI Action badge](https://github.com/mtkozlowski/movie-api/actions/workflows/node.js.yml/badge.svg)

```bash
# unit tests
$ npm run test


# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - Mateusz Kozłowski
- Website - [https://codeforheaven.com](https://codeforheaven.com/)
- Twitter - [@mtkozlowski](https://twitter.com/mtkozlowski)
