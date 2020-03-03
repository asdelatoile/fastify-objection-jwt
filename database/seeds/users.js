
const bcrypt = require('bcryptjs');
const password = 'demo'
const hash = bcrypt.hashSync(password, 10);
exports.seed = async function (knex) {
  await knex('users').del()
  await knex('users_roles').del()
  await knex('users').insert([
    {
      id: 1,
      email: 'admin@test.com',
      password: hash,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 2,
      email: 'test@test.com',
      password: hash,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);
  await knex('users_roles').insert([
    { userId: 1, roleId: 1 },
    { userId: 1, roleId: 2 },
    { userId: 1, roleId: 3 },
    { userId: 2, roleId: 1 }
  ]);
};
