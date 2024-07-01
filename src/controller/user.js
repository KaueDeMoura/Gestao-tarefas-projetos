const user = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SECRET_KEY = 'final-backend'
const SALT_VALUE = 10


class UserController {
    async createUser(nome, email, senha) {
       // try{
        if (nome === undefined || email === undefined || senha === undefined) {
            throw new Error('Nome, email e senha são obrigatórios.')
        }

        const cypherSenha = await bcrypt.hash(senha, SALT_VALUE)

        if (senha.trim() === '') {
            throw new Error('A senha não pode ser nula.')
        }

        const userValue = await user.create({
            nome,
            email,
            senha: cypherSenha, 
        })
        console.log(userValue.id, userValue.nome, userValue.email, userValue.senha);
        return userValue
   // } catch(error){
     //   console.log(error)
   // }
}

    async findUser(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório.')
        }

        const userValue = await user.findByPk(id)
        
        if (!userValue) {
            throw new Error('Usuário não encontrado.')
        }

        return userValue
    }

    async update(id, nome, email, senha) {
        if (id === undefined || nome === undefined || email === undefined || senha === undefined) {
            throw new Error('Id, Nome, email e senha são obrigatórios.')
        }

        const userValue = await this.findUser(id)

        userValue.nome = nome
        userValue.email = email
        userValue.senha = await bcrypt.hash(senha, SALT_VALUE)
        await userValue.save()

        return userValue
    }

    async delete(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório.')
        }
        const userValue = await this.findUser(id)
        userValue.destroy()

        return
    }

    async find() {
        return user.findAll()
    }

    async login(email, senha) {
        
        if (email === undefined || senha === undefined) {
            throw new Error('Email e senha são obrigatórios.')
        }

        const userValue = await user.findOne({ where: { email }})

        if (!userValue) {
            throw new Error('[1] Usuário e senha inválidos.')
        }

        const senhaValida = bcrypt.compare(senha, userValue.senha) 
        if (!senhaValida) {
            throw new Error('[2] Usuário e senha inválidos.')
        }

        return jwt.sign({ id: userValue.id }, SECRET_KEY, { expiresIn: 60 * 60 })
    }

    async validateToken(token) {
        if (!token) {
            throw new Error('Token inválido')
        }

        try {
            await jwt.verify(token, SECRET_KEY)
        } catch {
            throw new Error('Token inválido')
        }
    }
} 

module.exports = new UserController()