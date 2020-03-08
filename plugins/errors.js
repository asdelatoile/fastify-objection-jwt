'use strict'
const fp = require('fastify-plugin')

function errors(fastify, options, next) {

    fastify.setErrorHandler((error, request, reply) => {

        // Debug
        console.log(JSON.stringify(error));

        let errorOutput = {
            statusCode: error && error.code ? error.code : 500
        };

        if (error.name === 'ValidationError') {
            Object.assign(errorOutput, {
                statusCode: 400,
                error: "BadRequest",
                message: fastify.i18n.__('badrequest')
            });

            if (error.inner) {
                Object.assign(errorOutput, {
                    details: error.inner
                })
            }

        }
        if (error.name === 'UnauthorizedError') {
            Object.assign(errorOutput, {
                statusCode: 401,
                error: 'Unauthorized',
                message: fastify.i18n.__('unauthorized')
            })
        }
        return reply.status(errorOutput.statusCode).send(errorOutput)
    })

    next()
}

module.exports = fp(errors)