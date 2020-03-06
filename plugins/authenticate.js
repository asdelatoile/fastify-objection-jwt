const fp = require("fastify-plugin")

module.exports = fp(async function (fastify, opts) {
    fastify.register(require("fastify-jwt"), opts)

    fastify.decorate("retrieveToken", async function (request, reply) {
        try {
            return await request.jwtVerify()
        } catch (err) {
            return reply.send(err)
        }
    })

    fastify.decorate("generateToken", async function (options) {
        const token = await fastify.jwt.sign(options);
        return token;
    })

    fastify.decorate("retrieveUser", async function (request, reply) {
        try {
            const { User } = fastify.objection
            const user = await User.query()
                .withGraphJoined('[roles]')
                .findById(request.user.id)
            if (!user) {
                return reply.code(404).send({ error: 'User not found' })
            }
            request.user = user
        } catch (err) {
            return reply.send(err)
        }
    })


})