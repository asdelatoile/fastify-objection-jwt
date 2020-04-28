'use strict'
const fp = require('fastify-plugin')
const createError = require('http-errors')



function errors(fastify, options, next) {

    fastify.decorate('createError', createError)

    fastify.setErrorHandler((error, request, reply) => {

        // Debug
        // console.log(JSON.stringify(error));

        let errorOutput = {
            code: 500,
            name: error.name,
            message: error.message
        }

        switch (error.name) {
            case 'BadRequestError':
                Object.assign(errorOutput, {
                    code: 400,
                    message: error.message.message || error.message,
                    errors: error.message.errors
                })
                break;
            case 'UnprocessableEntityError':
                Object.assign(errorOutput, {
                    code: 422,
                    message: error.message.message || error.message
                })
                break;
            case 'NotFoundError':
                Object.assign(errorOutput, {
                    code: 404,
                    message: error.message.message || error.message
                })
                break;
            case 'UnauthorizedError':
                Object.assign(errorOutput, {
                    code: 401,
                    message: error.message.message || error.message
                })
                break;
            case 'MethodNotAllowedError':
                Object.assign(errorOutput, {
                    code: 405,
                    message: error.message.message || error.message
                })
                break;

            default:
        }

        return reply.status(errorOutput.code).send(errorOutput)

    })

    next()
}

module.exports = fp(errors)