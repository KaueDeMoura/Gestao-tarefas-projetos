const tarefa = require('../model/tarefa');
const ProjetoController = require('./projeto');

class TarefaController {
    async createTarefa(titulo, desc, dtCreate, status, projetoID) {
        if (titulo === undefined || desc === undefined || dtCreate === undefined || status === undefined || projetoID === undefined) {
            throw new Error('Título, descrição, data de criação, status e projetoID são obrigatórios.');
        }

        await ProjetoController.findProjeto(Number(projetoID));

        const tarefaValue = await tarefa.create({
            titulo,
            desc,
            dtCreate,
            status,
            projetoID
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

    async update(id, titulo, desc, dtCreate, status, projetoID) {
        if (id === undefined || titulo === undefined || desc === undefined || dtCreate === undefined || status === undefined || projetoID === undefined) {
            throw new Error('Id, título, descrição, data de criação, status e projetoID são obrigatórios.');
        }

        await ProjetoController.findProjeto(projetoID);

        const tarefaValue = await this.findTarefa(id);

        tarefaValue.titulo = titulo;
        tarefaValue.desc = desc;
        tarefaValue.dtCreate = dtCreate;
        tarefaValue.status = status;
        tarefaValue.projetoID = projetoID;
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
