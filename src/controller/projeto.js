const projeto = require('../model/projeto');
const UserController = require('./user');

class ProjetoController {
    async createProjeto(nome, desc, dtCreate, autorId) {
        try {
        if (nome === undefined || desc === undefined || dtCreate === undefined || autorId === undefined) {
            throw new Error('Nome, descrição, data de criação e autorId são obrigatórios.');
        }

        if (nome.trim() === '') {
            throw new Error('O nome do projeto não pode ser nulo ou vazio.');
        }

        const projetoValue = await projeto.create({
            nome,
            desc,
            dtCreate,
            autorId
        });

        return projetoValue;
    } catch (error) {
        console.log(error);
    }
}
////////////////
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

        const projetoValue = await this.findProjeto(id);

        if(projetoValue.autorId === autorId) {
        projetoValue.nome = nome;
        projetoValue.desc = desc;
        projetoValue.dtCreate = dtCreate;
        projetoValue.save()
        
        return projetoValue
        }else{
            throw new Error('Usuario invalido.')
        }
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
