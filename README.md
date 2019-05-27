<p align="center"><img src="https://i.imgur.com/Jq9XCVg.png"></p>

<p align="center">An easiest web app template on top of <a href="https://nestjs.com">nest</a>, <a href="http://typeorm.io">TypeORM</a>, <a href="https://nextjs.org">Next.js</a> and <a href="https://material-ui.com">Material UI</a>.</p>

<div align="center">
  <a href="https://david-dm.org/saltyshiomix/ark">
    <img src="https://david-dm.org/saltyshiomix/ark.svg" alt="Dependency Status" />
  </a>
  <a href="https://david-dm.org/saltyshiomix/ark?type=dev"> 
    <img src="https://david-dm.org/saltyshiomix/ark/dev-status.svg" alt="devDependency Status" />
  </a>
</div>

## Features

- Cross platform - Mac, Linux and Windows
- Database synchronization with entities - powered by [TypeORM](http://typeorm.io)
- Server Side Rendering - powered by [Next.js](https://nextjs.org)
- API server - powered by [nest](https://nestjs.com)
- User authentication - powered by [Passport](http://www.passportjs.org)
- [Material UI](https://material-ui.com) design
- Environment variables using [dotenv](https://github.com/motdotla/dotenv)

## Technologies

- Hot reloading for the developer experience :)
    - [nodemon](https://nodemon.io) - Monitor for any changes in your node.js application and automatically restart the server
    - [Next.js](https://nextjs.org) - The React Framework
- Lang
    - [TypeScript](https://www.typescriptlang.org) - Javascript that scales
- Database
    - [PostgreSQL](https://www.postgresql.org) - The World's Most Advanced Open Source Relational Database
- ORM (Object-relational mapping)
    - [TypeORM](http://typeorm.io) - ORM for TypeScript and JavaScript (ES7, ES6, ES5)
- Server
    - [nest](https://nestjs.com) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications
        - internally using [Express](https://expressjs.com) - Fast, unopinionated, minimalist web framework for Node.js
    - [Next.js](https://nextjs.org) - The React Framework
- Environment variables
    - [dotenv](https://github.com/motdotla/dotenv) - Loads environment variables from .env for nodejs projects
    - [dotenv-webpack](https://github.com/mrsteele/dotenv-webpack) - A secure webpack plugin that supports dotenv and other environment variables and only exposes what you choose and use.
- User authentication
    - [Passport](http://www.passportjs.org) - Simple, unobtrusive authentication for Node.js
- UI framework
    - [React](https://reactjs.org) - A JavaScript library for building user interfaces
    - [Next.js](https://nextjs.org) - The React Framework
    - [Material UI](https://material-ui.com) - React components that implement Google's Material Design.

## Setup

### Database Setup

Ark uses [PostgreSQL](https://www.postgresql.org).

#### For Mac Users

```bash
# install postgresql
$ brew install postgresql

# if you want to start postgresql in startup, try do this
$ brew services start postgresql

# [MUST] create user "arkuser" with password "arkark"
$ createuser -P arkuser

# [MUST] create database "arkdb" owened by "arkuser"
$ createdb arkdb -O arkuser
```

#### For Windows Users

##### Python

Because Ark uses [node.bcrypt.js](https://github.com/kelektiv/node.bcrypt.js), we need a Python:

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
        - `Name`: `arkuser`
    - `Definition` Panel:
        - `Password`: `arkark`
    - `Priviledges` Panel:
        - Check all `Yes`
- Right click `Databases` and `Create > Database`
    - `General` Tab:
        - `Database`: `arkdb`
        - `Owner`: `arkuser`

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

```
# DB
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=arkuser
DB_PASSWORD=arkark
DB_DATABASE=arkdb
DB_SYNCHRONIZE=true

# App
PROTOCOL=http
HOST=localhost
PORT=4000
SESSION_SECRET=ark
```

## Production Deployment

With production usages, please use [pm2](https://github.com/Unitech/pm2) for Node.js process managements.

```bash
# install pm2
$ npm install --global pm2

# run the app "ARK" with the config `ecosystem.config.js`
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

## Roadmaps

- [x] Support: Mac, Linux and Windows
- [x] Support: production usages
- [x] Security: environment variables both server and client
- [x] Security: production ready session store
- [x] Security: custom auth guards
- [x] Database: auto synchronization with entities
- [x] Server: integration between [nest](https://nestjs.com) and [Next.js](https://nextjs.org)
- [x] UI: integration between [Next.js](https://nextjs.org) and [Material UI](https://material-ui.com)
- [x] UX: validation
- [x] API: JSON API routes
- [x] Auth: [passport-local](https://github.com/jaredhanson/passport-local) (email & password)
- [ ] Auth: [passport-github2](https://github.com/cfsghost/passport-github) (GitHub login)
- [ ] Auth: [passport-twitter](https://github.com/jaredhanson/passport-twitter) (Twitter login)
- [x] Feature: authentication
- [ ] Feature: blogging
- [ ] Test: unit tests
- [ ] Test: e2e tests

## Articles

- [A road to the easiest user authentication system for Node.js](https://dev.to/saltyshiomix/a-road-to-the-easiest-user-authentication-system-for-nodejs-138f)
