const app = require('../app')
const request = require('supertest')



describe('Test GET /', () => {
    test('It should respond with 200 sucess', async () => {
        const response = await request(app).get('/').expect(200)
    })
})

describe('Test for user login', () => {
    const userData = {
        email: 'aswinedassery@gmail.com',
        password: 'Aswines@123'
    }

    test('should respond with 200', async () => {
        const response = await request(app)
                                    .post('/login')
                                    .send(userData)

        expect(response.statusCode).toBe(200)
    })
})