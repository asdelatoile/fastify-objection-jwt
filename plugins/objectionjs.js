'use strict'

const fp = require('fastify-plugin')
const Knex = require('knex')
const { Model } = require('objection')

const User = require('./../models/user.model.js')
const Role = require('./../models/role.model.js')


function objectionjs(fastify, options, next) {

    const knexConnection = Knex(options)

    const objection = {
        knex: knexConnection,
        User,
        Role
    }

    Model.knex(knexConnection)

    if (!fastify.objection) {
        fastify.decorate('objection', objection)
    } else {
        next(new Error('objectionjs has already registered.'))
        return
    }

    fastify.addHook('onClose', (fastify, done) => {
        knexConnection.destroy()
        done()
    })

    next()
}

module.exports = fp(objectionjs)