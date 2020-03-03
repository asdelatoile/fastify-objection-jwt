const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
    const yupOptions = opts
    const yupSchemaCompiler = schema => data => {
        try {
            const result = schema.validateSync(data, yupOptions)
            return { value: result }
        } catch (e) {
            e.message = e.errors
            return { error: e }
        }
    }

    fastify.decorate('yup', require('yup'))
    fastify.decorate('yupSchemaCompiler', yupSchemaCompiler)

})

