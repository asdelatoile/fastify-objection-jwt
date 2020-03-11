const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];
const fastify = require('fastify')(config.fastify)

// Errors handler
fastify.register(require('./plugins/errors'))

// Lang
fastify.register(require('./plugins/i18n'), config.i18n)

// Validation
fastify.register(require('./plugins/yup'), config.yup)

// Database
fastify.register(require('./plugins/objectionjs'), config.knex)

// Auths/Permissions
fastify.register(require('./plugins/authenticate'), config.jwt)
fastify.register(require('./plugins/permissions'))

// Services
fastify.register(require('./services/users'))

// Controllers
fastify.register(require('./controllers/AuthController'), { prefix: 'api/auth' })
fastify.register(require('./controllers/UserController'), { prefix: 'api/users' })

// Server
fastify.listen(3030, function (err) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})