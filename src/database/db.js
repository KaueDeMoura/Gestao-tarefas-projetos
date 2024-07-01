const { Sequelize } = require('sequelize')

class Database {
    constructor() {
        this.init()
    }

    init() {
        this.db = new Sequelize({
            database: 'final-backend',
            host: 'localhost',
            password: "2558",
            username: 'root',
            dialect: 'mysql'
        })    
    }
}

module.exports = new Database()