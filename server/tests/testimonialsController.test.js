const app = require("../app");
const request = require("supertest");

const id = 33;
const dummyData = { name: "testName", content: "testContent" };
const caseScenarios = [
    {},
    { name: "testName", },
    { content: "testContent" }
];

describe("POST /testimonials/add", () => {

    test("should respond with a 200 status code if data is sent", async () => {
        const response = await request(app).post("/testimonials/add").send(dummyData)
        expect(response.statusCode).toBe(200)
    });

    test("should respond with a content-type of application/json", async () => {
        const response = await request(app).post("/testimonials/add").send(dummyData)
        expect(response.header["content-type"]).toBe("application/json; charset=utf-8")
    });

    test('should respond with id property in the response', async () => {
        const response = await request(app).post('/testimonials/add').send(dummyData)
        expect(response.body.id).toBeDefined()
    });

    test("should respond with a 400 status code if no name or content or neither are sent", async () => {
        for (const scenario of caseScenarios) {
            const response = await request(app).post('/testimonials/add').send(scenario)
            expect(response.statusCode).toBe(400)
        };
    });
});

describe("DELETE /testimonials/delete/:id", () => {

    test("should return testimonial property set to 1 (truthy) if there's and id match", async () => {
        const response = await request(app).del(`/testimonials/delete/${id}`)
        expect(response.body).toHaveProperty('testimonial', 1);
    });

    test("should return testimonial property set to 0 (falsy) if there isn't matching id ", async () => {
        const response = await request(app).del("/testimonials/delete/notRealId")
        expect(response.body).toHaveProperty('testimonial', 0);
    });
});

describe("PUT /testimonials/:id", () => {

    test("should respond with a 200 status code if data is sent", async () => {
        const response = await request(app).put(`/testimonials/${id + 1}`).send(dummyData)
        expect(response.statusCode).toBe(200)
    });

    test("should respond with a content-type of application/json", async () => {
        const response = await request(app).put(`/testimonials/${id + 1}`).send(dummyData)
        expect(response.header["content-type"]).toBe("application/json; charset=utf-8")
    });

    test("should respond with error message if there is no matching id", async () => {
        const response = await request(app).put("/testimonials/not_real_id").send(dummyData)
        expect(response.body.errors[0]).toBeDefined()
    })

    test("should respond with an error message if name or content or both are not sent", async () => {
        for (const caseScenario of caseScenarios) {
            const response = await request(app).put(`/testimonials/${id + 1}`).send(caseScenario)
            expect(response.statusCode).toBe(400)
        };
    });

});
