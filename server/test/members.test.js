const app = require('../app.js')
const request = require('supertest')

describe('GET /members', () => {
    test('should be 200 status code if route exist', async () => {
        const response = await request(app).get('/members')
        expect(response.status).toBe(200)
    })

    test('should response with an array', async () => {
        const response = await request(app).get('/members')
        expect(response.body).toBeInstanceOf(Array)
    })
})

describe('POST /members', () => {

    const mockData = {
        name: 'harry',
        image: 'laimagen.jpg'
    }

    describe('Validations', () => {

        test('should be 400 status code if exist but nothing is sent', async () => {
            const response = await request(app).post('/members').send()
            expect(response.status).toBe(400)
        })

        test("should pass if application/json exist in headers", async () => {
            const response = await request(app).post('/members').send(mockData)
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })

        test('should be 200 status code if body data is sent', async () => {
            const response = await request(app).post('/members').send(mockData)
            expect(response.status).toBe(200)
        })

        test('If petition was OK, then the member data is going to be passed in the body', async () => {
            const response = await request(app).post('/members').send(mockData)
            expect(response.body.id).toBeDefined()
        })
    })

    describe('Body errors', () => {

        test('should be 400 status code if the body is empty', async () => {
            const response = await request(app).post('/members').send({})
            expect(response.status).toBe(400)
        })

        test('should be 400 status if only name field is sent', async () => {
            const response = await request(app).post('/members').send({ name: 'harry' })
            expect(response.status).toBe(400)
        })

        test('should be 400 status code if is not a valid name', async () => {
            const response = await request(app).post('/members').send({ name: 'elpejelagarto96', image: 'tuki.png' })
            expect(response.status).toBe(400)
        })

        test('should be 400 status code if only image field is sent', async () => {
            const response = await request(app).post('/members').send({ image: 'elcoscu.png' })
            expect(response.status).toBe(400)
        })

        test('should be 400 status code if name is empty', async () => {
            const response = await request(app).post('/members').send({ name: '', image: 'algo.png' })
            expect(response.status).toBe(400)
        })

        test("should be 400 status code if the file doesn't have image extension", async () => {
            const response = await request(app).post('/members').send({ name: 'mateo', image: 'adksdasdad' })
            expect(response.status).toBe(400)
        })
    })

})

describe('PUT /members/:id', () => {
    const id = 1
    const mockData = {
        name: 'harry',
        image: ';aimagen.jpg'
    }

    describe('Validations', () => {
        test("should be 404 status code if id doesn't match an user id", async () => {
            const response = await request(app).put(`/members/elharry`).send(mockData)
            expect(response.status).toBe(404)
        })

        test('should be 400 status code if exist but nothing is sent', async () => {
            const response = await request(app).put(`/members/${id}`).send()
            expect(response.status).toBe(400)
        })

        test('should be 200 status code if route exist, id is passed and object is sent', async () => {
            const response = await request(app).put(`/members/${id}`).send(mockData)
            expect(response.status).toBe(200)
        })

        test("should pass if application/json exist in headers", async () => {
            const response = await request(app).put(`/members/${id}`).send(mockData)
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })

        test("should be 200 even if name doesn't sent from the body", async () => {
            const response = await request(app).put(`/members/${id})`).send({ name: '', image: 'something.png' })
            expect(response.status).toBe(200)
        })

        test("should be 200 even if image doesn't sent from the body", async () => {
            const response = await request(app).put(`/members/${id})`).send({ name: 'something', image: '' })
            expect(response.status).toBe(200)
        })
    })

    describe('Body errors', () => {
        test('Name has to contain something even if body is sending an empty string', async () => {
            const response = await request(app).put(`/members/${id}`).send({ name: '', image: 'something.png' })
            expect(response.body.name).not.toBe('')
        })

        test('Image has to contain something even if body is sending an empty string', async () => {
            const response = await request(app).put(`/members/${id}`).send({ name: 'something', image: '' })
            expect(response.body.image).not.toBe('')
        })

        test('should be 400 status code if is not a valid name', async () => {
            const response = await request(app).put(`/members/${id}`).send({ name: 'elpejelagarto96', image: 'tuki.png' })
            expect(response.status).toBe(400)
        })

        test("should be 400 status code if the file doesn't have image extension", async () => {
            const response = await request(app).put(`/members/${id}`).send({ name: 'something', image: 'asdads' })
            expect(response.status).toBe(400)
        })
    })
})

describe('DELETE /members/:id', () => {
    test("should be 404 status code if id doesn't match an user id", async () => {
        const response = await request(app).delete('/members/asdasd')
        expect(response.status).toBe(404)
    })

    test('should be 200 status code if route exist', async () => {
        const response = await request(app).delete('/members/11')
        expect(response.status).toBe(200)
    })
})

