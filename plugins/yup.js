const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
    const yupOptions = opts
    const yupSchemaCompiler = schema => data => {
        try {
            const result = schema.validateSync(data, yupOptions)
            return { value: result }
        } catch (e) {
            let errors = {};
            e.inner.map(err => {
                errors[err.path] = err.message;
            });
            return { error: fastify.createError.BadRequest({ message: fastify.i18n.__('badrequest'), errors: errors }) }
        }
    }

    fastify.decorate('yup', require('yup'))
    fastify.decorate('yupSchemaCompiler', yupSchemaCompiler)

})

