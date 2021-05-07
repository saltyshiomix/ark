<p align="center"><img src="https://i.imgur.com/hTXWo3k.png"></p>

<p align="center">An easiest authentication system on top of <a href="https://nestjs.com">NestJS</a>, <a href="http://typeorm.io">TypeORM</a>, <a href="https://nextjs.org">NEXT.js (v9)</a> and <a href="https://material-ui.com">Material UI (v4)</a>.</p>

<div align="center">
  <img src="https://img.shields.io/github/license/saltyshiomix/ark.svg" alt="Package License (MIT)">
</div>

## Features

- Cross platform - Mac, Linux and Windows
- Database synchronization with entities - powered by [TypeORM](http://typeorm.io)
- Server Side Rendering - powered by [NEXT.js](https://nextjs.org)
- API server - powered by [NestJS](https://nestjs.com)
- Authentication - powered by [Passport](http://www.passportjs.org)
- [Material UI](https://material-ui.com) design

## Technologies

- Hot reloading for the developer experience :)
  - [ts-node-dev](https://github.com/whitecolor/ts-node-dev) - Compiles your TS app and restarts when files are modified
  - [NEXT.js](https://nextjs.org) - The React Framework
- Lang
  - [TypeScript](https://www.typescriptlang.org) - Javascript that scales
- Database
  - [PostgreSQL](https://www.postgresql.org) - The World's Most Advanced Open Source Relational Database
- ORM (Object-relational mapping)
  - [TypeORM](http://typeorm.io) - ORM for TypeScript and JavaScript (ES7, ES6, ES5)
- Server
  - [NestJS](https://nestjs.com) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications
      - internally using [Express](https://expressjs.com) - Fast, unopinionated, minimalist web framework for Node.js
  - [NEXT.js](https://nextjs.org) - The React Framework
- Environment variables
  - [dotenv](https://github.com/motdotla/dotenv) - Loads environment variables from .env for nodejs projects
  - [dotenv-webpack](https://github.com/mrsteele/dotenv-webpack) - A secure webpack plugin that supports dotenv and other environment variables and only exposes what you choose and use.
- User authentication
  - [Passport](http://www.passportjs.org) - Simple, unobtrusive authentication for Node.js
- UI framework
  - [React](https://reactjs.org) - A JavaScript library for building user interfaces
  - [NEXT.js](https://nextjs.org) - The React Framework
  - [Material UI](https://material-ui.com) - React components that implement Google's Material Design.

## Setup

```bash
# prepare `.env` and edit it for your own environments
$ cp .env.example .env

# setup database
$ docker-compose up --detach
$ docker-compose exec db psql -U postgres -c 'create user arkuser;'
$ docker-compose exec db psql -U postgres -c 'create database arkdb;'

# install dependencies
$ yarn

# development mode
$ yarn dev

# production mode
$ yarn build
$ yarn start
```

The `.env` file is like this:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=arkuser
DB_PASSWORD=arkpass
DB_DATABASE=arkdb
DB_SYNCHRONIZE=true

APP_PROTOCOL=http
APP_HOST=localhost
APP_PORT=4000
APP_SESSION_SECRET=ark
```

## Production Deployment

With production usages, please use [pm2](https://github.com/Unitech/pm2) for Node.js process managements.

```bash
# install pm2
$ npm install --global pm2

# run the app "ARK" with the config `ecosystem.config.js`
$ cd ark
$ pm2 start
```

The example `ecosystem.config.js`:

```js
module.exports = {
  apps : [{
    name: 'ARK',
    script: '.next/production-server/main.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
```

## Screenshots

### Register Page

<p align="center"><img src="https://i.imgur.com/hTXWo3k.png"></p>

### Login Page

<p align="center"><img src="https://i.imgur.com/hxoJvmJ.png"></p>

### Top Page (Auth Guard)

<p align="center"><img src="https://i.imgur.com/ym0XlJR.png"></p>

## Articles

- [A road to the easiest user authentication system for Node.js](https://dev.to/saltyshiomix/a-road-to-the-easiest-user-authentication-system-for-nodejs-138f)

## Related

- [YARK](https://github.com/saltyshiomix/yark) - Yet another easiest authentication system on top of NestJS, TypeORM, react-ssr and Material UI(v4)
