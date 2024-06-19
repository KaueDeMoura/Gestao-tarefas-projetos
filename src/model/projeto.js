const database = require('../database/db')

class Projeto {
    constructor() {
        this.model = database.db.define('projetos', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true
            },
            nome: {
                type: database.db.Sequelize.STRING
            },
            desc: {
                type: database.db.Sequelize.STRING
            },
            dtCreate: {
                type: database.db.Sequelize.STRING
            },
            autorId: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                }
            }
        })
    }
}

module.exports = (new Projeto()).model