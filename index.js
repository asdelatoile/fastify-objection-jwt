const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];
const fastify = require('fastify')(config.fastify)


fastify.register(require('./plugins/objectionjs'), config.knex)
fastify.register(require('./plugins/yup'), config.yup)

fastify.register(require('./plugins/authenticate'), config.jwt)
fastify.register(require('./plugins/permissions'))

fastify.register(require('./services/users'))

fastify.register(require('./controllers/publicController'))


fastify.listen(3000, function (err) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})