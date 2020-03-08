'use strict'
const fp = require('fastify-plugin')
const i18n = require("i18n");

function i18nPlugin(fastify, options, next) {


    i18n.configure(options);

    if (!fastify.i18n) {
        fastify.decorate('i18n', i18n)
    } else {
        next(new Error('i18n has already registered.'))
        return
    }


    next()
}


module.exports = fp(i18nPlugin)