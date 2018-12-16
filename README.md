<p align="center"><img src="https://i.imgur.com/NjfVsRm.png"></p>

<p align="center">An easiest web app template on top of <a href="https://nestjs.com/">nest</a>, <a href="http://typeorm.io/">TypeORM</a>, <a href="https://nextjs.org/">Next.js</a> and <a href="https://material-ui.com/">Material UI</a>.</p>

## Features

- Database synchronization with entities - powered by [TypeORM](http://typeorm.io/)
- Server Side Rendering - powered by [Next.js](https://nextjs.org/)
- API server - powered by [nest](https://nestjs.com/)
- User authentication - powered by [Passport](http://www.passportjs.org/)
- [Material UI](https://material-ui.com/) design
- Environment viriables using [dotenv](https://github.com/motdotla/dotenv/)

## Technologies

- Lang
    - [TypeScript](https://www.typescriptlang.org/) - Javascript that scales
- Database
    - [PostgreSQL](https://www.postgresql.org/) - The World's Most Advanced Open Source Relational Database
- ORM (Object-relational mapping)
    - [TypeORM](http://typeorm.io/) - ORM for TypeScript and JavaScript (ES7, ES6, ES5)
- Server
    - [nest](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications
        - internally using [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
    - [Next.js](https://nextjs.org/) - The React Framework
- Environment variables
    - [dotenv](https://github.com/motdotla/dotenv/) - Loads environment variables from .env for nodejs projects
- User authentication
    - [Passport](http://www.passportjs.org/) - Simple, unobtrusive authentication for Node.js
- UI framework
    - [React](https://reactjs.org/) - A JavaScript library for building user interfaces
    - [Next.js](https://nextjs.org/) - The React Framework
    - [Material UI](https://material-ui.com/) - React components that implement Google's Material Design.

## Setup

```bash
# install database (postgresql)
$ brew install postgresql

# if you want to start postgresql in startup, try do this
$ brew services start postgresql

# create user "arkuser" with password "arkark"
$ createuser -P arkuser

# create database "arkdb" owened by "arkuser"
$ createdb arkdb -O arkuser

# install dependencies
$ yarn

# development mode
# please make sure to create the `.env` file!
$ yarn dev

# production mode
# please make sure to create the `.next/.env` file!
$ yarn build
$ yarn start
```

## Roadmaps

- [x] Security: environment variables
- [x] Database: auto synchronization with entities
- [x] Server: integration between [nest](https://nestjs.com/) and [Next.js](https://nextjs.org/)
- [ ] API: define JSON API routes (if needed)
- [x] UI: integration between [Next.js](https://nextjs.org/) and [Material UI](https://material-ui.com/)
- [x] UI: top page
- [ ] UI: user profile page
- [ ] UX: validation
- [x] Auth: [passport-local](https://github.com/jaredhanson/passport-local) (email & password)
- [ ] Auth: [passport-github2](https://github.com/cfsghost/passport-github) (GitHub login)
- [ ] Auth: [passport-twitter](https://github.com/jaredhanson/passport-twitter) (Twitter login)
- [ ] Test: unit tests
- [ ] Test: e2e tests

## Articles

- [A road to the easiest user authentication system for Node.js](https://dev.to/saltyshiomix/a-road-to-the-easiest-user-authentication-system-for-nodejs-138f)
