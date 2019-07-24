# Portal

An easiest web app template on top of [Nest.js](https://nestjs.com), [GraphQL](https://graphql.org/), [PostGraphile](https://www.graphile.org/postgraphile/),
[Next.js (v9)](https://nextjs.org) and [Material UI (v4)](https://material-ui.com)

<!-- ![Ark](https://i.imgur.com/Jq9XCVg.png) -->

## Features

- [x] Cross platform - Mac, Linux and Windows
- [x] API server - powered by [Nest](https://nestjs.com)
- [x] Environment variables using [dotenv](https://github.com/motdotla/dotenv)
- [x] Server Side Rendering - powered by [Next.js](https://nextjs.org)
- [x] [Material UI](https://material-ui.com) design
- [x] [GraphQL](https://graphql.org/), [PostGraphile](https://www.graphile.org/postgraphile/), [postgraphile-nest](https://github.com/alex-ald/postgraphile-nest)
- [ ] WebSockets
- [ ] User authentication - powered by [Passport](http://www.passportjs.org)
- [ ] Admin page

## Technologies

- Hot reloading for the developer experience
  - [nodemon](https://nodemon.io) - Monitor for any changes in your node.js application and automatically restart the server
  - [Next.js](https://nextjs.org) - The React Framework
- Lang
  - [TypeScript](https://www.typescriptlang.org) - Javascript that scales
- Tests
  - [ESLint](https://eslint.org/) - A fully pluggable tool for identifying and reporting on patterns in JavaScript
  - [Jest](https://jestjs.io/) - Delightful JavaScript Testing
  - [Enzyme](https://airbnb.io/enzyme/) - JavaScript Testing utilities for React
  - [@material-ui/core/test-utils](https://material-ui.com/guides/testing/)
  - [@nestjs/testing](https://docs.nestjs.com/fundamentals/testing) - unit testing, e2e testing
  - [Supertest](https://github.com/visionmedia/supertest) - for e2e testing
- Server
  - [nest](https://nestjs.com) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications
    - internally using [Express](https://expressjs.com) - Fast, unopinionated, minimalist web framework for Node.js
  - [Next.js](https://nextjs.org) - The React Framework
- Environment variables
  - [dotenv](https://github.com/motdotla/dotenv) - Loads environment variables from .env for nodejs projects
  - [dotenv-webpack](https://github.com/mrsteele/dotenv-webpack) - A secure webpack plugin that supports dotenv and other environment variables and only exposes what you choose and use.
- Database
  - [PostgreSQL](https://www.postgresql.org) - The World's Most Advanced Open Source Relational Database
  - [GraphQL](https://github.com/graphql/express-graphql) - Create a GraphQL HTTP server with Express.
- PostGraphile
  - [PostGraphile](https://www.graphile.org/postgraphile/usage-library/) - Execute one command (or mount one Node.js middleware) and get an instant high-performance GraphQL API for your PostgreSQL database!
  - [postgraphile-nest](https://github.com/alex-ald/postgraphile-nest) - GraphQL with Postgres with Nest. A module for Nest that allows you to easily integrate PostGraphile into your application.
- WebSockets
  - subscription
- User authentication
  - [Passport](http://www.passportjs.org) - Simple, unobtrusive authentication for Node.js
- UI framework
  - [React](https://reactjs.org) - A JavaScript library for building user interfaces
  - [Next.js](https://nextjs.org) - The React Framework
  - [Material UI](https://material-ui.com) - React components that implement Google's Material Design.

## Setup

### Database Setup

Portal uses [PostgreSQL](https://www.postgresql.org).

#### For Mac Users

```bash
# install postgresql
$ brew install postgresql

# if you want to start postgresql in startup, try do this
$ brew services start postgresql

# [MUST] create user "portal"
$ createuser -P -l portal
# [MUST] create user "portal_visitor"
$ createuser -P -l portal_visitor

# [MUST] create database "portal" owened by "portal"
$ createdb portal -O portal
```

#### For Windows Users

##### Python

Because Portal uses [node.bcrypt.js](https://github.com/kelektiv/node.bcrypt.js), we need a Python:

- Download an installer at <https://www.python.org/downloads/windows>
- Install with "Add Python 3.X to PATH" checked

##### [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools)

- Run `npm install --global --production windows-build-tools` from an elevated PowerShell or CMD.exe **as Administrator**

##### PostgreSQL

- Download an installer at <https://www.postgresql.org/download/windows>
- Run the installer with a flag `--install_runtimes 0` like this:

```cmd
> postgresql-11.2-1-windows-x64.exe --install_runtimes 0
```

##### pgAdmin

- Download a latest installer at <https://www.pgadmin.org/download>
- Run the pgAdmin and login with a root user
- Right click `Login/Group Roles` and `Create > Login/Group Role`
  - `General` Panel:
    - `Name`: `portal`
  - `Definition` Panel:
    - `Password`: `portalpwd`
  - `General` Panel:
    - `Name`: `portal_visitor`
  - `Definition` Panel:
    - `Password`: `portalpwd`
- Right click `Databases` and `Create > Database`
  - `General` Tab:
    - `Database`: `portaldb`
    - `Owner`: `portal`

### Application Setup

```bash
# prepare `.env` and edit it for your own environments
$ cp .env.example .env

# install dependencies
$ yarn

# development mode
$ yarn dev

# production mode
$ yarn build
$ yarn start
```

The `.env` file is like this:

```bash
# DB
DATABASE_ADMIN=postgres://postgres:postgres@localhost:5432/portaldb
DATABASE_URL=postgres://portal:portal@localhost:5432/portaldb
DATABASE_SCHEMA=app_public,app_private,app_jobs

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0
REDIS_PASSWORD=
REDIS_PREFIX=

# App
HOST=http://localhost
PORT=4000
SESSION_SECRET=portal
```

## Production Deployment

With production usages, please use [pm2](https://github.com/Unitech/pm2) for Node.js process managements.

```bash
# install pm2
$ npm install --global pm2

# run the app "Portal" with the config `ecosystem.config.js`
$ pm2 start
```

The example `ecosystem.config.js`:

```js
module.exports = {
  apps: [
    {
      name: 'Portal',
      script: '.next/production-server/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
```

## Roadmaps

- [x] Support: Mac, Linux and Windows
- [x] Support: production usages
- [x] Security: environment variables both server and client
- [x] Security: production ready session store
- [x] Security: custom auth guards
- [x] Server: integration between [Nest](https://nestjs.com) and [Next.js](https://nextjs.org)
- [x] UI: integration between [Next.js](https://nextjs.org) and [Material UI](https://material-ui.com)
- [x] Test: unit tests
- [x] Test: e2e tests
- [x] PostGraphile
- [ ] WebSockets
- [ ] API: JSON API routes
- [ ] UX: validation
- [ ] Auth: [passport-local](https://github.com/jaredhanson/passport-local) (email & password)
- [ ] Auth: [passport-github2](https://github.com/cfsghost/passport-github) (GitHub login)
- [ ] Auth: [passport-twitter](https://github.com/jaredhanson/passport-twitter) (Twitter login)
- [ ] Feature: authentication
- [ ] Feature: blogging

## Trouble Shootings

### Node.js v10 vs v12

We use Node.js **v12**, so if you use v10, please `rm -f yarn.lock`:

(Because Node.js v10 and v12 are incompatible in terms of no coexistence. APIs are compatible.)

```bash
# remove incompatible dependencies
$ rm -rf node_modules yarn.lock

# use your compatible dependencies
$ yarn
```
