
exports.up = async function (knex) {
    await knex.schema.createTable('users', function (table) {
        table.increments('id');
        table.string('email').unique();
        table.string('password');
        table.string('googleId').nullable();
        table.string('facebookId').nullable();
        table.string('twitterId').nullable();
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
    })
};

exports.down = async function (knex) {
    await knex.schema.dropTable('users')
};
