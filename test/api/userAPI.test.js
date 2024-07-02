const request = require('supertest');
const app = require('../../src/index');
const bcrypt = require('bcrypt')

describe('User', () => {

    beforeAll(async () => {
        console.info('Iniciando TDD com jest')
    });

    afterAll(() =>{
        console.info('Encerrados os testes')
    });

    let token;

    it('Post USER, criar usuario)', async () =>{
        const response = await request(app)
            .post('/api/v1/user')
            .send({
                nome:"Teste",
                email:"teste8@gmail.com",
                senha:"12345678"
            });

            console.log(response.body, response.body.nome, response.body.email, response.body.senha)
            expect(response.statusCode).toBe(201)
            expect(response.body).toHaveProperty("id")
            expect(response.body.nome).toBe("Teste")
            expect(response.body.email).toBe("teste8@gmail.com")
            //
    })

    it('LOGIN USER, logar em um usuario', async () => {
        const response = await request(app)
            .post('/api/v1/login')
            .send({
                email:"joao@gmail.com",
                senha:"12345678"
            });
            console.log(response.body);
            token = response.body.token;
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty("token");
    });

    it('DELETE USER)', async () => {
        const responseDelete = await request(app)
            .post('/api/v1/user')
            .send({
                nome:"joao",
                email:"joao@gmail.com",
                senha:"12345678"
            });
        const response = await request(app)
            .delete(`/api/v1/user/${responseDelete.body.id}`)
            .set('Authorization', `Bearer ${token}`)
    })

    /*it('GET USER, listar usuarios)', async () => {
        const response = await request(app)
            .get('/api/v1/user/')

        console.log(response.body);
        expect(response.statusCode).toBe(200);
    });*/
})