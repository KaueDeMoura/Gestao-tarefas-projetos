const app = require("../../src/index");
const request = require("supertest");
const bcrypt = require('bcrypt')
const SALT_VALUE = 10

describe("Projeto", () => {
  
  let token;

    it("POST Projeto", async () => {

        const cypherSenha = await bcrypt.hash("1234567", SALT_VALUE)
        const userresponse = await request(app)
          .post("/api/v1/user")
          .send({
            nome: "UserTest",
            email: "teste@gmail.com",
            senha: "1234567"
          });
          console.log("criar usuario")
          console.log(userresponse.body.nome, userresponse.body.email, userresponse.body.senha);

        expect(userresponse.statusCode).toBe(201);
        expect(userresponse.body).toHaveProperty("id");

        const userresponselogin = await request(app)
          .post("/api/v1/login")
          .send({

            email: "teste@gmail.com",
            senha: "1234567"
          });
      
          console.log("Resposta do login:", userresponselogin.body);

        expect(userresponselogin.statusCode).toBe(200);
        expect(userresponselogin.body).toHaveProperty("token");

        token = userresponselogin.body.token;

        console.log("Token armazenado:", token);



       const projetoresponse = await request(app)
          .post("/api/v1/projeto/")
          .set('authorization', token)
          .send({
            id:1,
            nome:"Projeto1",
            desc:"desc",
            dtCreate:"25/06/2024",
            autorId:1,
          });
      
        console.log("POst Projeto", projetoresponse.body, projetoresponse.body.nome, projetoresponse.body.desc, projetoresponse.body.dtCreate, projetoresponse.body.autorId);
        expect(projetoresponse.statusCode).toBe(201);
       expect(projetoresponse.body).toHaveProperty("id");
        expect(projetoresponse.body.nome).toBe("Projeto1");
        expect(projetoresponse.body.desc).toBe("desc");
        expect(projetoresponse.body.dtCreate).toBe("25/06/2024");
        expect(projetoresponse.body.autorId).toBe(1);
      });

    
}); 