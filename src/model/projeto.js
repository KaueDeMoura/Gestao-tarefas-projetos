const database = require('../database/db')

class Projeto {
    constructor() {
        this.model = database.db.define('projetos', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: database.db.Sequelize.STRING,
                validate: {
                    len: [1, 55]
                }
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