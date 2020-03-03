
exports.seed = async function (knex) {
  await knex('roles').del()
  await knex('roles').insert([
    { id: 1, name: 'guest' },
    { id: 2, name: 'admin' },
    { id: 3, name: 'superadmin' }
  ]);
};