module.exports = function (fastify, opts, done) {

    // GET USERS
    fastify.route({
        method: 'GET',
        url: '/',
        preHandler: [fastify.retrieveToken, fastify.retrieveUser, fastify.permissions(['superadmin'])],
        handler: async function (request, reply) {
            const users = await fastify.userService.getUsersWithRoles();
            reply.code(200).send(users)
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
            if (!user) reply.code(404).send({ error: 'User not found' })
            reply.code(200).send({ user })
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
                reply.code(400).send({ error: 'User alredy exists' })
            }
            const user = await fastify.userService.createUser(body);
            reply.code(201).send({ user })
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
            if (!user) reply.code(404).send({ error: 'User not found' })
            reply.code(200).send({ user })
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
            reply.code(200).send({ message: "success" })
        }
    })

    done()

}