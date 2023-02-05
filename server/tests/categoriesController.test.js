const app = require("../app");
const request = require("supertest");

describe("GET /categories", () => {

    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/categories").send()
        expect(response.statusCode).toBe(200)
    });

    //next one only works when turning off the server
    test("should respond with a 400 status code if server is down", async () => {
        const response = await request(app).get("/categories").send()
        expect(response.statusCode).toBe(400)
    });

    test("should respond with a content-type of application/json", async () => {
        const response = await request(app).get("/categories").send()
        expect(response.header["content-type"]).toBe("application/json; charset=utf-8")
    });

    test("should respond with an array", async () => {
        const response = await request(app).get("/categories").send()
        expect(expect.arrayContaining(response.body))
    });
});

describe("DEL /categories:id", () => {

    const idOk = 4
    const idOk2 = 5
    const idNotOk = "NOT_A_REAL_ID"

    test("should respond with a 200 status code", async () => {
        const response = await request(app).del(`/categories/${idOk}`).send()
        expect(response.statusCode).toBe(200);
    });

    test("should respond with a SUCCES message", async () => {
        const response = await request(app).del(`/categories/${idOk2}`).send()
        expect(response.body).toHaveProperty('status', 'succes');
    });

    test("should respond with a 404 status code for a non existing category", async () => {
        const response = await request(app).del(`/categories/${idNotOk}`).send()
        expect(response.statusCode).toBe(404);
    });

    test("should respond with an ERROR message for a non existing category", async () => {
        const response = await request(app).del(`/categories/${idNotOk}`).send()
        expect(response.body).toHaveProperty('status', 'error');
    });

});
