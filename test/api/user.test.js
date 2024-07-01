const app = require("../../src/index");
const request = require("supertest");
const bcrypt = require('bcrypt')

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

    it("POST USER sem nome", async () => {
      const response = await request(app)
        .post("/api/v1/user")
        .send({
            nome: "", 
            email: "teste@gmail.com", 
            senha: "1234567"
         });
  
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("error");

      /*expect(response.body.nome).toBe("");
      expect(response.body.email).toBe("teste@gmail.com");
      //
      const isPasswordValid = await bcrypt.compare("1234567", response.body.senha);
      expect(isPasswordValid).toBe(true);*/
    })

    it("POST USER sem Email", async () => {
      const response = await request(app)
        .post("/api/v1/user")
        .send({
            nome: "Usertest", 
            email: "", 
            senha: "1234567"
         });
  
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("error");
      
      /*expect(response.body.nome).toBe("");
      //expect(response.body.email).toBe("teste@gmail.com");
      //
      const isPasswordValid = await bcrypt.compare("1234567", response.body.senha);
      expect(isPasswordValid).toBe(true);*/
    })


    it("POST USER sem Senha", async () => {
      const response = await request(app)
        .post("/api/v1/user")
        .send({
            nome: "Usertest", 
            email: "teste@gmail.com", 
            senha: ""
         });
  
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("error");
      
      /*expect(response.body.nome).toBe("");
      expect(response.body.email).toBe("teste@gmail.com");
      //
      const isPasswordValid = await bcrypt.compare("1234567", response.body.senha);
      expect(isPasswordValid).toBe(true);*/
    })

}); 