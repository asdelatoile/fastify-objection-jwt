'use strict'
const fp = require('fastify-plugin')

function errors(fastify, options, next) {

    fastify.setErrorHandler((error, request, reply) => {
        console.log(JSON.stringify(error));
        let errorOutput;
        errorOutput.statusCode = error.code;

        if (error.name === 'ValidationError') {
            errorOutput = {
                statusCode: 400,
                error: "ValidationError",
                message: "Bad Request"
            }
            if (error.inner) {
                errorOutput.details = error.inner
            }
        }
        if (error.name === 'UnauthorizedError') {
            errorOutput = {
                statusCode: 401,
                error: 'Unauthorized',
                message: 'Unauthorized'
            }
        }
        return reply.status(errorOutput.statusCode).send(errorOutput)
    })

    next()
}

module.exports = fp(errors)