const TarefaController = require('../controller/tarefa')

class TarefaApi {
    async createTarefa(req, res) {
        const { titulo, desc, dtCreate, status, projetoID } = req.body

        try {
            const tarefa = await TarefaController.createTarefa(titulo, desc, dtCreate, status, projetoID)
            return res.status(201).send(tarefa)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao criar tarefa ${e.message}` })
        }
    }

    async updateTarefa(req, res) {
        const { id } = req.params
        const { titulo, desc, dtCreate, status, projetoID } = req.body

        try {
            const tarefa = await TarefaController.updateTarefa(Number(id), titulo, desc, dtCreate, status, projetoID)
            return res.status(200).send(tarefa)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao alterar tarefa ${e.message}` })
        }
    }

    async deleteTarefa(req, res) {
        const { id } = req.params

        try {
            await TarefaController.deleteTarefa(Number(id))
            return res.status(204).send()
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar tarefa ${e.message}` })
        }
    }

    async findTarefas(req, res) {
        try {
            const tarefas = await TarefaController.findTarefas()
            return res.status(200).send(tarefas)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar tarefas ${e.message}` })
        }
    }

    async findTarefaById(req, res) {
        const { id } = req.params

        try {
            const tarefa = await TarefaController.findTarefaById(Number(id))
            if (!tarefa) {
                return res.status(404).send({ error: 'Tarefa não encontrada' })
            }
            return res.status(200).send(tarefa)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao buscar tarefa ${e.message}` })
        }
    }
}

module.exports = new TarefaApi()
