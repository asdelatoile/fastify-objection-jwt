# fastify/objection/jwt

My first project with [fastify](https://www.fastify.io/)

## Table of Contents

- [Installation](#installation)
- [Commands](#commands)
- [Urls](#urls)

## Installation

```bash
$ npm install knex -g
$ git clone https://github.com/asdelatoile/fastify-objection-jwt
$ cd fastify-objection-jwt
$ npm i
$ npm run db:migrate
$ npm run db:seed
```

And then you should be able to run with

```bash
$ npm run dev
```

Users
email : admin@test.com / password : demo
email : test@test.com / password : demo

## Commands

Start server

```bash
$ npm run dev
```

Delete database

```bash
$ npm run db:delete
```

Run migrations

```bash
$ npm run db:migrate
```

Run seeds

```bash
$ npm run db:seed
```

Reset database (delete/migrate/seeds)

```bash
$ npm run db:reset
```

## Urls

```
[GET] (test route)
http://localhost:3000/

[POST] (email,password)
http://localhost:3000/register

[POST] (email,password)
http://localhost:3000/login

[GET] (token header)
http://localhost:3000/me
```
