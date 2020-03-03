
exports.up = async function (knex) {
    await knex.schema.createTable('roles', function (table) {
        table.increments('id');
        table.string('name');
    })
    await knex.schema.createTable('users_roles', function (table) {
        table.increments('id');
        table.integer('userId').unsigned().notNullable();
        table.integer('roleId').unsigned().notNullable();
    })
};

exports.down = async function (knex) {
    await knex.schema.dropTable('users_roles')
    await knex.schema.dropTable('roles')
};
