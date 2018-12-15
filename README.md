<p align="center"><img src="https://i.imgur.com/NjfVsRm.png"></p>

<p align="center">An easiest web app template on top of <a href="https://nestjs.com/">nest</a>, <a href="http://typeorm.io/">TypeORM</a>, <a href="https://nextjs.org/">Next.js</a> and <a href="https://material-ui.com/">Material UI</a>.</p>

## Feature

- Database synchronization with entities - powered by [TypeORM](http://typeorm.io/)
- Server Side Rendering - powered by [Next.js](https://nextjs.org/)
- API server - powered by [nest](https://nestjs.com/)
- Authentication
- [Material UI](https://material-ui.com/) design
- Environment viriables using [dotenv](https://github.com/motdotla/dotenv)

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
