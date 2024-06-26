const TarefaController = require('../controller/tarefa')
const cookieParser = require('cookie-parser');

class TarefaApi {
    
    async createTarefa(req, res) {
        const { titulo, descricao, id_projeto } = req.body
        try {
            const tarefa = await TarefaController.createTarefa(titulo, descricao, id_projeto)
            return res.status(201).send(tarefa)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao criar uma tarefa ${e.message}`})
        }
    }

    async updateTarefa(req, res) {
        const { id } = req.params
        const { titulo, descricao, status, id_projeto } = req.body

        try {
            const tarefa = await TarefaController.update(Number(id), titulo, descricao, status, id_projeto)
            return res.status(200).send(tarefa)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao alterar tarefa ${e.message}`})
        }
    }

    async deleteTarefa(req, res) {
        const { id } = req.params

        try {
            await TarefaController.delete(Number(id))
            return res.status(204).send()
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar tarefa ${e.message}`})
        }
    }

    async findTarefas(req, res) {
        try {
            const tasks = await TarefaController.find()
            return res.status(200).send(tasks)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar tarefa ${e.message}`})
        }
    }

    async validateCookie(req, res, next) {
        const cookie = req.headers.cookies;

        try {
            TarefaController.getCookie(cookie)
            next()
        } catch (e) {
            res.status(400).send({ error: e.message })
        }
    }
    async filterTarefa(req, res){
        const { id_projeto } = req.params;
        const { status } = req.query;

        try {
            const tarefa = await TarefaController.filter(Number(id_projeto),status)
            return res.status(200).send(tarefa)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao filtrar tarefa ${e.message}`})
        }
    
    }
}

module.exports = new TarefaApi()