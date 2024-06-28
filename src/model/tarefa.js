const database = require('../database/db')

class Tarefa {
    constructor() {
        this.model = database.db.define('tarefas', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            titulo: {
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
            status: {
                type: database.db.Sequelize.STRING
            },
            projetoId: {
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