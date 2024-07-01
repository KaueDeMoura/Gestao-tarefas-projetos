const app = require("../../src/index");
const database = require("../../src/database/db");
const request = require("supertest");


describe("User", () => {

    it("POST USER", async () => {
        const response = await request(app)
          .post("/api/v1/user")
          .send({
              nome: "UserTest", 
              email: "teste@gmail.com", 
              senha: "1234567"
           });
    
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.nome).toBe("UserTest");
        expect(response.body.email).toBe("teste@gmail.com");
        //
        const isPasswordValid = await bcrypt.compare("1234567", response.body.senha);
        expect(isPasswordValid).toBe(true);
      })

  
  it('Put /api/v1/user/:id - Alterar Usuario', async () => {
    const response = await request(app)
      .post("/api/v1/user")
      .send({
          nome: "UserTest", 
          email: "userteste@gmail.com", 
          senha: "1234567"
       });

    const responsePut = {
        id: 1,
        name: 'UserTestAlterado',
        email: 'usertestAlterado@gmail.com',
        senha: "1234567alterado"
    }
        .put(`/api/v1/user/1`)
        .send(responsePut);
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toEqual(responsePut.id);
        expect(response.body.name).toEqual(responsePut.name); 
        expect(response.body.email).toEqual(responsePut.email);
});    


it('Delete /api/v1/user/:id - Excluir usuario', async () => {
        const response = await request(app)
        .delete(`/api/v1/user/1`);
        expect(response.statusCode).toBe(204);

}); 


});