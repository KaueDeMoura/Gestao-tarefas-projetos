const app = require("../../src/index");
const request = require("supertest");
const bcrypt = require('bcrypt')

describe("Tarefa", () => {
  
    it("POST Tarefa", async () => {
      const response = await request(app)
        .post("/api/v1/tarefa")
        .send({
            titulo:"titulo",
            desc:"desc",
            dtCreate:"25/06/2024",
            status:"andamento",
            projetoId:1
         });
  
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.titulo).toBe("titulo");
      expect(response.body.desc).toBe("desc");
      expect(response.body.dtCreate).toBe("25/06/2024");
      expect(response.body.status).toBe("andamento");
      expect(response.body.projetoId).toBe("1");
    })

    /*it("POST USER sem nome", async () => {
      const response = await request(app)
        .post("/api/v1/tarefa")
        .send({
            id:1,
            titulo:"titulo",
            desc:"desc",
            dtCreate:"25/06/2024",
            status:"andamento",
            projetoId:1
         });
  
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("error");

      /*expect(response.body.nome).toBe("");
      expect(response.body.email).toBe("teste@gmail.com");
      //
      const isPasswordValid = await bcrypt.compare("1234567", response.body.senha);
      expect(isPasswordValid).toBe(true);
    })

    it("POST USER sem Email", async () => {
      const response = await request(app)
        .post("/api/v1/tarefa")
        .send({
            id:1,
            titulo:"titulo",
            desc:"desc",
            dtCreate:"25/06/2024",
            status:"andamento",
            projetoId:1
         });
  
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("error");
      
      /*expect(response.body.nome).toBe("");
      expect(response.body.email).toBe("teste@gmail.com");
      //
      const isPasswordValid = await bcrypt.compare("1234567", response.body.senha);
      expect(isPasswordValid).toBe(true);
    })


    it("POST USER sem Senha", async () => {
      const response = await request(app)
        .post("/api/v1/tarefa")
        .send({
            id:1,
            titulo:"titulo",
            desc:"desc",
            dtCreate:"25/06/2024",
            status:"andamento",
            projetoId:1
         });
  
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("error");
      
      /*expect(response.body.nome).toBe("");
      expect(response.body.email).toBe("teste@gmail.com");
      //
      const isPasswordValid = await bcrypt.compare("1234567", response.body.senha);
      expect(isPasswordValid).toBe(true);*/
   // })*/

}); 