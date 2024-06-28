const ProjetoController = require('../controller/projeto')

class ProjetoApi {
    async createProjeto(req, res) {
        const { nome, desc, dtCreate, autorId} = req.body
    


        try {
            const projeto = await ProjetoController.createProjeto(nome, desc, dtCreate, autorId)
            return res.status(201).send(projeto)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao criar um projeto ${e.message}`})
        }
    }

    async updateProjeto(req, res) {
        //const { id } = req.params
        const { id, nome, desc, dtCreate, autorId} = req.body

        try {
            const projeto = await ProjetoController.update(id, nome, desc, dtCreate, autorId)
            return res.status(200).send(projeto)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao alterar o Projeto ${e.message}`})
        }
    }

    async deleteProjeto(req, res) {
        const { id } = req.params

        try {
            await ProjetoController.delete(Number(id))
            return res.status(204).send()
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar o Projeto  ${e.message}`})
        }
    }

    async findProjetos(req, res) {
        try {
            const projetos = await ProjetoController.find()
            return res.status(200).send(projetos)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar os Projetos  ${e.message}`})
        }
    }
}

module.exports = new ProjetoApi()