const fp = require("fastify-plugin")

module.exports = fp(async function (fastify, opts) {

    const getUserByEmail = async function (email) {
        const { User } = fastify.objection
        return await User.query().findOne({ email })
    }

    const getUserByEmailWithRoles = async function (email) {
        const { User } = fastify.objection
        return await User.query()
            .withGraphJoined('[roles]')
            .findOne({ email })
    }

    const getUserByIdWithRoles = async function (id) {
        const { User } = fastify.objection
        return await User.query()
            .withGraphJoined('[roles]')
            .findById(id)
    }

    const createUser = async function (payload) {
        const { User } = fastify.objection
        return await User.query().insert(payload)
    }

    const checkPassword = async function (user, password) {
        return await user.verifyPassword(password)
    }

    fastify.decorate("userService", {
        getUserByEmail,
        getUserByEmailWithRoles,
        getUserByIdWithRoles,
        checkPassword,
        createUser
    })



})