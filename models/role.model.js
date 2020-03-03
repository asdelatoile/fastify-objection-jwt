const { Model } = require('objection')

class Role extends Model {

    static get tableName() {
        return 'roles';
    }

    static get idColumn() {
        return 'id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],

            properties: {
                name: { type: 'string' }
            }
        }
    }
    $beforeInsert() {
        this.createdAt = this.updatedAt = new Date().toISOString()
    }

    $beforeUpdate() {
        this.updatedAt = new Date().toISOString()
    }
    static get relationMappings() {
        const User = require('./user.model')
        return {
            users: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: 'roles.id',
                    through: {
                        from: 'users_roles.roleId',
                        to: 'users_roles.userId'
                    },
                    to: 'users.id'
                }
            }
        };
    }
}

module.exports = Role