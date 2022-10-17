# Storefront API

A node API for a store built with Typescript & PostgreSQL.

## Tech Stack

- Node.js Runtime.
- Express for writing node server;.
- [pg client](https://node-postgres.com/) for managing database connections & running queries.
- [Jasmine](https://jasmine.github.io/) for writing unit tests.

## Architecture

![Project Architecture](./images/arch.jpg)

## Dependecies

You need the following modules and dependencies installed to run this project:

- Docker for the pdotgresql database container.
- Node 16 for the backend server to run.
- npm for managing project dependencies.

## Pre running

- I have added two sql files for data migrations under the [data](./data/) folder; [one](./data/seedup.sql) for seeding
  the database with initial data, for testing purposes, and the [second one](./data/teardown.sql) for cleaning the
  database from any data.
- I also added two node script files under the [scripts](./scripts/) folder; each script would run a data migration sql
  file on the specified database.

## Run locally

- Run `npm install` to install project dependencies.
- Rename `.env.example` to `.env` and provide values for the variables. See example configurations below:

  ```bash
  # Server
  PORT=3000

  # Environment
  NODE_ENV=test

  # Database settings
  POSTGRES_PORT=5432
  POSTGRES_DB=db_dev
  POSTGRES_HOST=0.0.0.0
  POSTGRES_USER=db_user
  POSTGRES_DB_TEST=db_test
  POSTGRES_PASSWORD=db_password

  # JWT & Bcrypt settings
  SALT=10
  PEPPER=I-am-beyonce-always
  SECRET=I-declare-bankruptcy
  ```

- Run `docker compose up` to get the postgresql container up and ready for development.
- Access the posgresql instance on the docker container using `psql -U postgres`.
- Create two databses one for development and one for testing by running `CREATE DATABASE <database_name>`. Make sure
  to replace `<database_name>` with the database name.
- Create a new databse role using `CREATE USER <user> WITH PASSWORD <password>`. Make sure to replace both `<user>` &
  `<password>` with the user name and password you want.
- Connect to each databse using `\c <database_name>`. Make sure to replace `<database_name` with the actual value.
- Grant all permissions on the dev and test databases to the newly created user using
  `GRANT ALL PRIVILEGES ON DATABASE <database_name> TO <user>`. Make sure to replace the `<database_name>` and `<user>`
  with the actual values.
- Run the database migrations using `NODE_ENV=<env> npm run migrate:up`. Replace `<env>` with the actual value which
  can be either **test** or **dev**.
- Run the data migrations using `NODE_ENV=<env> npm run seed` to seed the database with initial data.
- Run `npm run dev` to run the development server and run `npm start` to run the production server.
- Finally, the data migrations inserted two users found below. You can choose any one for authentciation to get a token
  to use for most of the API endpoints.
  - email: __mscott@dm.com__, password: **date_mike**
  - email: __dshrute@dm.com__, password: **battlestar_galactica**

> These users only work for the bcrypt secret provided in the example .env config above

## Unit tests

The tests for the server is written in Jasmine. I have added two environemnts for database **dev** and **test**, see
[database.json](./database.json) for more info about each database environment. The steps below show how to run the unit
tests for the testing database environment. To run it on the **dev** environemnt just set `NODE_ENV` to `dev` like
this `NODE_ENV=dev`

- `NODE_ENV=test npm run build` to build the project with the testing database as default.
- `NODE_ENV=test npm run seed` to seed the testing database with initial data.
- `NODE_ENV=test npm test` to run unit tests on the testing database.
- `NODE_ENV=test npm run teardown` to clean up the testing database from any data.

**Important Note**

> The commnads `seed & teardown` will prompt you to provide the database password.

### Coverage

I have provided 69 unit tests that covers:

- pg database client.
- each database model.
- each data model handler.

## Available Scripts

- `dev`: to start the development server
- `start`: to start the production server
- `test`: to run jasmine tests on chosen database env
- `lint`: to run eslint on the project's typescript files
- `clean`: to remove old build folder before building a new one
- `lint:fix`: to fix issues identified by eslint
- `prebuild`: to run `npm run clean`
- `format`: to run prettier on the project's typescript files
- `migrate:up` to run database migrations on the chosen database env
- `migrate:down` to drop the last migration on the chosen database env
- `seed` to run the [seedup.js](./scripts/seedup.js) to populate the chosen database env with seed data
- `teardown` to run the [teardown.js](./scripts/teardown.js) to clean the chosen database env from seed and any data

## Available API Endpoints & Database Schema

See [REQUIREMENTS.md](./REQUIREMENTS.md) file.
