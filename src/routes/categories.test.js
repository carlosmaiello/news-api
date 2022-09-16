const request = require("supertest");
const { database, Category } = require("../models");
const app = require("./../app");

describe("Routes", () => {
    beforeAll(async () => {
        await database.sync();
    });

    describe("categories", () => {
        test("GET /", async () => {
            const response = await request(app)
                .get("/categories")
                .expect(200);
        })
        test("POST /", async () => {
            const response = await request(app)
                .post('/categories')
                .send({
                    name: "Categoria Teste"
                })
                .expect(201);

            await request(app)
                .post('/categories')
                .send({})
                .expect(500);                
        })
        test("GET /:id", async () => {
            const cat = await Category.create({
                name: "Categoria teste"
            });

            const response = await request(app)
                .get(`/categories/${cat.id}`)
                .expect(200);

            const response2 = await request(app)
                .get("/categories/1000")
                .expect(500);
        })
        test("POST /:id", async () => {
            const cat = await Category.create({
                name: "Categoria teste 2"
            });

            const response = await request(app)
                .post(`/categories/${cat.id}`)
                .send({
                    name: "Outra categoria"
                })
                .expect(200);
         })
        test("DELETE /:id", async () => { 
            const cat = await Category.create({
                name: "Categoria teste 3"
            });
            const response = await request(app)
                .delete(`/categories/${cat.id}`)
                .expect(204);
        })

    });

});