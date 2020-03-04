module.exports = function (fastify, opts, done) {

    fastify.route({
        method: 'GET',
        url: '/',
        preHandler: [fastify.retrieveToken, fastify.retrieveUser, fastify.permissions(['superadmin'])],
        handler: async function (request, reply) {
            const users = await fastify.userService.getUsersWithRoles();
            reply.code(200).send(users)
        }
    })

    done()

}