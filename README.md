# fastify/objection/jwt

My first project with [fastify](https://www.fastify.io/).
Authentication, permissions, objectionjs, yup, i18n

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
email : superadmin@test.com / password : demo
email : admin@test.com / password : demo
email : guest@test.com / password : demo

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
http://localhost:3000/api/auth/test

[POST] (email,password)
http://localhost:3000/api/auth/register

[POST] (email,password)
http://localhost:3000/api/auth/login

[GET] (token header, auth)
http://localhost:3000/api/auth/me

[GET] (token header, superadmin auth)
http://localhost:3000/api/users

[GET] (token header, superadmin auth)
http://localhost:3000/api/users/:id

[POST] (token header, superadmin auth)
http://localhost:3000/api/users

[PATCH] (token header, superadmin auth)
http://localhost:3000/api/users/:id

[DELETE] (token header, superadmin auth)
http://localhost:3000/api/users/:id
```
