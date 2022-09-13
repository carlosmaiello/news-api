const request = require("supertest");
const { database, Category } = require("../models");
const app = require("./../app");

describe("Routes", () => {
    beforeAll(async () => {
        await database.sync({ logging: false });
    });

    describe("categories", () => {
        test("GET /", async () => {
            const response = await request(app)
                .get("/categories")
                .expect(200);
        })
        test("POST /", () => { })
        test("GET /:id", async () => {
            const cat = await Category.create({
                name: "Categoria teste"
            });

            console.log(cat);

            const response = await request(app)
                .get(`/categories/${cat.id}`)
                .expect(200);

            console.log(response.text);

            const response2 = await request(app)
                .get("/categories/1000")
                .expect(500);
        })
        test("POST /:id", () => { })
        test("DELETE /:id", () => { })

    });

});