module.exports = function (fastify, opts, done) {

    fastify.route({
        method: 'GET',
        url: '/test',
        handler: async function (request, reply) {
            const { User, Role } = fastify.objection
            const users = await User.query()
                .withGraphJoined('[roles]')
            const roles = await Role.query().withGraphFetched('users');
            reply.code(200).send({
                data: {
                    users,
                    roles
                }
            })
        }
    })

    fastify.route({
        method: 'GET',
        url: '/me',
        preHandler: [fastify.retrieveToken, fastify.retrieveUser, fastify.permissions(['guest', 'superadmin', 'admin'])],
        handler: function (request, reply) {
            reply.code(200).send({ "user": request.user })
        }
    })

    fastify.route({
        method: 'POST',
        url: '/login',
        schema: {
            body: fastify.yup.object({
                email: fastify.yup.string().email().required(),
                password: fastify.yup.string().required()
            }),
            response: {
                200: {
                    type: 'object',
                    properties: {
                        token: { type: 'string' }
                    }
                }
            }
        },
        schemaCompiler: fastify.yupSchemaCompiler,
        handler: async function (request, reply) {
            const { email, password } = request.body;
            const user = await fastify.userService.getUserByEmailWithRoles(email);
            if (!user) {
                return reply.status(401).send({ error: 'Wrong email or password' });
            }
            const authorize = await fastify.userService.checkPassword(user, password);
            if (!authorize) {
                return reply.status(401).send({ error: 'Wrong email or password' });
            }
            const { id, name, roles } = user;
            const token = await fastify.generateToken({ id });
            return reply.send({ token });
        }
    });

    fastify.route({
        method: 'POST',
        url: '/register',
        schema: {
            body: fastify.yup.object({
                email: fastify.yup.string().email().required(),
                password: fastify.yup.string().required()
            }),
            response: {
                201: {
                    type: 'object',
                    properties: {
                        token: { type: 'string' }
                    }
                }
            }
        },
        schemaCompiler: fastify.yupSchemaCompiler,
        handler: async function (request, reply) {
            const { body } = request;
            const checkUser = await fastify.userService.getUserByEmailWithRoles(body.email);
            if (checkUser) {
                reply.code(400).send({ error: 'User alredy exists' })
            }
            const user = await fastify.userService.createUser(body);
            const token = await fastify.generateToken({ id: user.id });
            reply.code(201).send({ token })
        }
    })

    done()

}