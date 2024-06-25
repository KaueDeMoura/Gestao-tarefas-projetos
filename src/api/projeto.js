const ProjetoController = require('../controller/projeto')

class ProjetoApi {
    async createProjeto(req, res) {
        const { nome, descricao} = req.body
        const id_usuario = req.cookies.userId;

        try {
            const projeto = await ProjetoController.createProjeto(nome, descricao, id_usuario)
            return res.status(201).send(projeto)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao criar um projeto ${e.message}`})
        }
    }

    async updateProjeto(req, res) {
        const { id } = req.params
        const { nome, descricao} = req.body
        const id_usuario = req.cookies.userId;
        try {
            const projeto = await ProjetoController.update(Number(id), nome, descricao, id_usuario)
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