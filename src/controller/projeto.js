const projeto = require('../model/projeto');
const UserController = require('./user');

class ProjetoController {
    async createProjeto(nome, desc, dtCreate, autorId) {
        if (nome === undefined || desc === undefined || dtCreate === undefined || autorId === undefined) {
            throw new Error('Nome, descrição, data de criação e autorId são obrigatórios.');
        }

        await UserController.findUser(Number(autorId));

        const projetoValue = await projeto.create({
            nome,
            desc,
            dtCreate,
            autorId
        });

        return projetoValue;
    }

    async findProjeto(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório.')
        }
    
        const projetoValue = await projeto.findByPk(id)
        
        if (!projetoValue) {
            throw new Error('Postagem não encontrada.')
        }
    
        return projetoValue
    }

    async update(id, nome, desc, dtCreate, autorId) {
        if (id === undefined || nome === undefined || desc === undefined || dtCreate === undefined || autorId === undefined) {
            throw new Error('Id, nome, descrição, data de criação e autorId são obrigatórios.');
        }

        await UserController.findUser(autorId);

        const projetoValue = await this.findProjeto(id);

        projetoValue.nome = nome;
        projetoValue.desc = desc;
        projetoValue.dtCreate = dtCreate;
        projetoValue.autorId = autorId;
        await projetoValue.save();

        return projetoValue;
    }

    async delete(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório.');
        }
        
        const projetoValue = await this.findProjeto(id);
        await projetoValue.destroy();

        return;
    }

    async find() {
        return projeto.findAll();
    }
}

module.exports = new ProjetoController();