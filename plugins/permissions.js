const fp = require("fastify-plugin")

module.exports = fp(async function (fastify, opts) {

    fastify.decorate("permissions", (perms) => async function (request, reply) {
        const permissionList = typeof perms === 'string' ? perms.split(',').map(current => current.trim()) : perms;
        const authorize = request.user.roles.some(current => permissionList.includes(current.name));
        if (!authorize) {
            throw fastify.createError.MethodNotAllowed({ message: fastify.i18n.__('youdonthavepermission') })
        }
    });

})