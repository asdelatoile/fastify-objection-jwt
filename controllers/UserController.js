module.exports = function (fastify, opts, done) {

    // GET USERS
    fastify.route({
        method: 'GET',
        url: '/',
        preHandler: [fastify.retrieveToken, fastify.retrieveUser, fastify.permissions(['superadmin'])],
        handler: async function (request, reply) {
            const users = await fastify.userService.getUsersWithRoles();
            return reply.code(200).send(users)
        }
    })

    // SHOW
    fastify.route({
        method: 'GET',
        url: '/:id',
        preHandler: [fastify.retrieveToken, fastify.retrieveUser, fastify.permissions(['superadmin'])],
        handler: async function (request, reply) {
            const { id } = request.params
            const user = await fastify.userService.getUserByIdWithRoles(id);
            if (!user) throw fastify.createError.NotFound({ message: fastify.i18n.__('usernotfound') })

            return reply.code(200).send({ user })
        }
    })

    // CREATE
    fastify.route({
        method: 'POST',
        url: '/',
        preHandler: [fastify.retrieveToken, fastify.retrieveUser, fastify.permissions(['superadmin'])],
        handler: async function (request, reply) {
            const { body } = request;
            const checkUser = await fastify.userService.getUserByEmailWithRoles(body.email);
            if (checkUser) {
                throw fastify.createError.UnprocessableEntity({ message: fastify.i18n.__('useralredyexist') })
            }
            const user = await fastify.userService.createUser(body);
            return reply.code(201).send({ user })
        }
    })

    // UPDATE
    fastify.route({
        method: 'PATCH',
        url: '/:id',
        preHandler: [fastify.retrieveToken, fastify.retrieveUser, fastify.permissions(['superadmin'])],
        handler: async function (request, reply) {
            const { id } = request.params
            const { body } = request
            console.log(id, body)
            const user = await fastify.userService.updateUser(id, body);
            if (!user) throw fastify.createError.NotFound({ message: fastify.i18n.__('usernotfound') })
            return reply.code(200).send({ user })
        }
    })

    // DELETE
    fastify.route({
        method: 'DELETE',
        url: '/:id',
        preHandler: [fastify.retrieveToken, fastify.retrieveUser, fastify.permissions(['superadmin'])],
        handler: async function (request, reply) {
            const { id } = request.params
            const user = await fastify.userService.deleteUserById(id);
            return reply.code(200).send({ message: fastify.i18n.__('success') })
        }
    })

    done()

}