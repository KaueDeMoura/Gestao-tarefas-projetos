const app = require("../../src/index");
const request = require("supertest");

describe("User", () => {
  
    it("POST USER", async () => {
      const response = await request(app)
        .post("/api/v1/user")
        .send({
            nome: "UserTest", 
            email: "teste@gmail.com", 
            senha: "123456"
         });
  
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.nome).toBe("UserTest");
      expect(response.body.email).toBe("teste@gmail.com");
     // expect(response.body.senha).toBe("123456");
    })



    /*it("GET USER", async () => {
        const response = await request(app)
          .get("/api/v1/user")
    
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.nome).toBe("UserTest");
        expect(response.body.email).toBe("teste@gmail.com");
       // expect(response.body.senha).toBe("123456");
      })*/

       it("POST USER sem nome", async () => {
        const response = await request(app)
          .post("/api/v1/user")
          .send({
              nome: "", 
              email: "teste@gmail.com", 
              senha: "123456"
           });
    
        expect(response.statusCode).toBe(201);
        expect(response.body.error).toBe(undefined);
      })

      it("POST USER sem nome", async () => {
        const response = await request(app)
          .post("/api/v1/user")
          .send({
              nome: "", 
              email: "teste@gmail.com", 
              senha: "123456"
           });
    
        expect(response.statusCode).toBe(201);
        expect(response.body.error).toBe(undefined);
      })
}); 