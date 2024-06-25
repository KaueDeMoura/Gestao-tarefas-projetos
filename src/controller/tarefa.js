const tarefa = require('../model/tarefa');
const ProjetoController = require('./projeto');

class TarefaController {
    async createTarefa(titulo, desc, dtCreate, status, projetoId) {
        if (titulo === undefined || desc === undefined || dtCreate === undefined || status === undefined || projetoId === undefined) {
            throw new Error('Título, descrição, data de criação, status e projetoId são obrigatórios.');
        }

        const projetoValue = await projeto.findByPk(projetoId);
        if (!projetoValue) {
            throw new Error('Projeto não encontrado.');
        }

        const tarefaValue = await tarefa.create({
            titulo,
            desc,
            dtCreate,
            status,
            projetoId
        });

        return tarefaValue;
    }

    async findTarefa(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório.');
        }

        const tarefaValue = await tarefa.findByPk(id);
        
        if (!tarefaValue) {
            throw new Error('Tarefa não encontrada.');
        }

        return tarefaValue;
    }

    async update(id, titulo, desc, dtCreate, status, projetoId) {
        if (id === undefined || titulo === undefined || desc === undefined || dtCreate === undefined || status === undefined || projetoId === undefined) {
            throw new Error('Id, título, descrição, data de criação, status e projetoId são obrigatórios.');
        }

        await ProjetoController.findProjeto(projetoId);
        
        const tarefaValue = await this.findTarefa(id);

        tarefaValue.titulo = titulo;
        tarefaValue.desc = desc;
        tarefaValue.dtCreate = dtCreate;
        tarefaValue.status = status;
        tarefaValue.projetoId = projetoId;
        await tarefaValue.save();

        return tarefaValue;
    }

    async delete(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório.');
        }
        
        const tarefaValue = await this.findTarefa(id);
        await tarefaValue.destroy();

        return;
    }

    async find() {
        return tarefa.findAll();
    }
}

module.exports = new TarefaController();
