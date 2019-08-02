# Portal

[Nest.js](https://nestjs.com), [TypeORM](https://typeorm.io), [GraphQL](https://graphql.org/), [Next.js (v9)](https://nextjs.org), [Material UI (v4)](https://material-ui.com), [React.js](https://reactjs.org/)

## Features

- [x] Cross platform - Mac, Linux and Windows
- [x] API server - powered by [Nest](https://nestjs.com)
- [x] Environment variables using [dotenv](https://github.com/motdotla/dotenv)
- [x] Server Side Rendering - powered by [Next.js](https://nextjs.org)
- [x] [Material UI](https://material-ui.com) design
- [x] [TypeORM](https://typeorm.io)
- [x] [GraphQL](https://graphql.org/)
- [x] [React.js](https://reactjs.org/)
- [x] User authentication - powered by [Passport](http://www.passportjs.org)
- [ ] [WebSockets](https://www.apollographql.com/docs/link/links/ws/)
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
- WebSockets
  - subscription
- User authentication
  - [Passport](http://www.passportjs.org) - Simple, unobtrusive authentication for Node.js
- UI framework
  - [React](https://reactjs.org) - A JavaScript library for building user interfaces
  - [Next.js](https://nextjs.org) - The React Framework
  - [Apollo GraphQL](https://www.apollographql.com/client/) - A fully-featured, production ready caching GraphQL client for every UI framework and GraphQL server
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
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=portal
DATABASE_PASSWORD=portalpwd
DATABASE_NAME=portaldb
DATABASE_SCHEMA=app_public

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

# LDAP
LDAP_URL=ldap://activedirectory:389
LDAP_BIND_DN=CN=Administrator,DC=example,DC=local
LDAP_BIND_PW=PaSsWoRd123
LDAP_SEARCH_BASE=DC=example,DC=local
LDAP_SEARCH_FILTER=(&(&(|(&(objectClass=user)(objectCategory=person))(&(objectClass=contact)(objectCategory=person)))))
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
- [x] Feature: authentication with Passport-JWT
- [ ] WebSockets - [Apollo Link WS](https://www.apollographql.com/docs/link/links/ws/)
- [ ] API: JSON API routes
- [ ] UX: validation
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
