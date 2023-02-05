const app = require('../app.js')
const request = require('supertest')

//needed for testing protected routes
let adminToken = ''
let userToken = ''

//props needed
const propsNeeded = ['name', 'phone', 'email', 'message']

//get users token. Users are based in demo users created with seeder.
beforeAll(async () => {
    const resAdmin = await request(app).post('/users/auth/login').send({
        email: "admin@test.com",
        password: "12345678"
    })
    adminToken = resAdmin.body.token

    const resUser = await request(app).post('/users/auth/login').send({
        email: "usuario@test.com",
        password: "12345678"
    })
    userToken = resUser.body.token
})

//TESTS
describe('GET /contacts', () => {

    it('It should return status code 200', async () => {
        const res = await request(app).get('/contacts').set('Authorization', `Bearer ${adminToken}`)
        expect(res.status).toBe(200)
    })

    it('It should response an array of objects, each one with properties "name", "phone", "email" & "message"', async () => {
        const res = await request(app).get('/contacts').set('Authorization', `Bearer ${adminToken}`)

        expect(res.body).toBeInstanceOf(Array)

        res.body.map(contact => {
            propsNeeded.map(prop => {
                expect(contact).toHaveProperty(prop)
            })
        })
    })

    describe('Admin token validations', () => {

        it('It should return status code 401 (Unauthorized) if no token is passed', async () => {
            const res = await request(app).get('/contacts')
            expect(res.status).toBe(401)
        })
    
        it('It should return status code 401 (Unauthorized) if no valid token is passed', async () => {
            const invalidAdminToken = '1234'
            const res = await request(app).get('/contacts').set('Authorization', `Bearer ${invalidAdminToken}`)
    
            expect(res.status).toBe(401)
        })

        it('It should return status code 401 (Unauthorized) if roleId !== 1 (admin)', async () => {
            const res = await request(app).get('/contacts').set('Authorization', `Bearer ${userToken}`)
            expect(res.status).toBe(401)
        })

    })
})

describe('POST /contacts', () => {
    const dummyData = {
        name: 'test',
        phone: '123456',
        email: 'test@test.com',
        message: 'this is a message test'
    }

    it('It should return status code 200 if all data needed is sent', async () => {
        const res = await request(app).post('/contacts').send(dummyData)
        expect(res.status).toBe(200)
    })

    it("It should pass if headers type is equal to application/json", async () => {
        const res = await request(app).post('/contacts').send(dummyData)
        expect(res.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('It should return "id", "name", "phone", "email" & "message" if contact was saved', async () => {
        const res = await request(app).post('/contacts').send(dummyData)

        expect(res.body).toHaveProperty('id')
        propsNeeded.map(prop => {
            expect(res.body).toHaveProperty(prop)
        })
    })

    it('It should return status code 400 if route exist but no data is sent', async () => {
        const res = await request(app).post('/contacts').send()
        expect(res.status).toBe(400)
    })

    describe('Data sent validation', () => {
        it('It should return status code 400 if data is empty', async () => {
            const res = await request(app).post('/contacts').send({})
            expect(res.status).toBe(400)
        })

        it('It should return status code 400 if invalid email is passed', async () => {
            const data = {...dummyData}
            data.email = 'invalidEmail'

            const res = await request(app).post('/contacts').send(data)
            expect(res.status).toBe(400)
        })

        it('It should return status code 400 if "name", "phone", "email" or "message" are missing', async () => {
            propsNeeded.map(async (prop) => {
                const data = {...dummyData}
                delete data[prop]

                const res = await request(app).post('/contacts').send(data)
                expect(res.status).toBe(400)
            })
        })

        it('It should return status code 400 if "name", "phone", "email" or "message" are empty', async () => {
            propsNeeded.map(async (prop) => {
                const data = {...dummyData}
                data[prop] = ''

                const res = await request(app).post('/contacts').send(data)
                expect(res.status).toBe(400)
            })
        })
    })
})
