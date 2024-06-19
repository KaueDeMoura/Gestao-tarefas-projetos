const database = require('../database/db')

class Tarefa {
    constructor() {
        this.model = database.db.define('tarefas', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true
            },
            titulo: {
                type: database.db.Sequelize.STRING
            },
            desc: {
                type: database.db.Sequelize.STRING
            },
            dtCreate: {
                type: database.db.Sequelize.STRING
            },
            status: {
                type: database.db.Sequelize.STRING
            },
            projetoID: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'projetos',
                    key: 'id'
                }
            }
        })
    }
}

module.exports = (new Tarefa()).model