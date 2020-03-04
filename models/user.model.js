const { Model } = require('objection')
const bcrypt = require('bcryptjs')

class User extends Model {

    static get tableName() {
        return 'users';
    }

    static get idColumn() {
        return 'id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                id: { type: 'integer' },
                email: { type: 'string', minLength: 1, maxLength: 255 },
                password: { type: 'string', minLength: 1, maxLength: 255 },
                googleId: { type: 'string' },
                facebookId: { type: 'string' },
                twitterId: { type: 'string' },
                created_at: { type: 'string' },
                updated_at: { type: 'string' }
            }
        }
    }

    async $beforeInsert() {
        this.password = await bcrypt.hash(this.password, 8)
        this.createdAt = this.updatedAt = new Date().toISOString()
    }

    async $beforeUpdate() {
        this.updatedAt = new Date().toISOString()
    }

    static get relationMappings() {
        const Role = require('./role.model')
        return {
            roles: {
                relation: Model.ManyToManyRelation,
                modelClass: Role,
                join: {
                    from: 'users.id',
                    through: {
                        from: 'users_roles.userId',
                        to: 'users_roles.roleId'
                    },
                    to: 'roles.id'
                }
            }
        };
    }

    async verifyPassword(password) {
        return await bcrypt.compare(password, this.password)
    }

}

module.exports = User