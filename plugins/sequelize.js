const fp = require('fastify-plugin')
const SequelizeClient = require('./../models');

module.exports = fp(async function (fastify, opts) {
    fastify.decorate('sequelize', SequelizeClient(opts))
})

