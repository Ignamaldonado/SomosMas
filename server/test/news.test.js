const request = require('supertest');
const app = require('../app')

describe('GET /news', () => {
  test('should respond with a 200 status code', async () => {
    const data = await request(app).get('/news');
    expect(data.statusCode).toBe(200);
  })

  test('should respond with an array', async () => {
    const data = await request(app).get('/news');
    expect(data.body).toBeInstanceOf(Array);
  });
})

describe('POST /news', () => {
  test('should respond with a 200 status code', async () => {
    const data = await request(app).post('/news').send({ name: 'Test', image: 'TestImage', categoryId: 1, content: 'TestContent' });
    expect(data.statusCode).toBe(200)
  });

  test("should pass if application/json exist in headers", async() => {
    const data = await request(app).post('/news').send({ name: 'Test', image: 'TestImage', categoryId: 1, content: 'TestContent' })
    expect(data.headers['content-type']).toEqual(expect.stringContaining('json'))
  })

  test('should respond with the created entry', async () => {
    const data = await request(app).post('/news').send({ name: 'TestCreated', image: 'TestImageCreated', categoryId: 1, content: 'TestContentCreated' });
    const res = await request(app).get(`/news/${data.body.id}`);
    expect(data.body.name).toBe(res.body.name);
    expect(data.body.image).toBe(res.body.image);
    expect(data.body.categoryId).toBe(res.body.categoryId);
    expect(data.body.content).toBe(res.body.content);
  });

  test('should respond with a status code 400 when it does not receive the required data', async () => {
    const data = await request(app).post('/news').send({ name: 'TestCreated', image: 'TestImageCreated', categoryId: 1 });
    expect(data.statusCode).toBe(400)
    const data2 = await request(app).post('/news').send({ name: 'TestCreated', image: 'TestImageCreated', content: 'TestContentCreated' });
    expect(data2.statusCode).toBe(400)
    const data3 = await request(app).post('/news').send({ name: 'TestCreated', categoryId: 1, content: 'TestContentCreated' });
    expect(data3.statusCode).toBe(400)
    const data4 = await request(app).post('/news').send({ image: 'TestImageCreated', categoryId: 1, content: 'TestContentCreated' });
    expect(data4.statusCode).toBe(400)
  });

  test('should respond with an error message when it does not receive the required data', async () => {
    const data = await request(app).post('/news').send({ name: 'TestCreated', image: 'TestImageCreated', categoryId: 1 });
    expect(data.text).toEqual('Por favor escribe un contenido válido. ');
    const data2 = await request(app).post('/news').send({ name: 'TestCreated', image: 'TestImageCreated', content: 'TestContentCreated' });
    expect(data2.text).toEqual('Por favor ingresa un categoryId válido. ');
    const data3 = await request(app).post('/news').send({ name: 'TestCreated', categoryId: 1, content: 'TestContentCreated' });
    expect(data3.text).toEqual('Por favor ingresa una imagen válida. ');
    const data4 = await request(app).post('/news').send({ image: 'TestImageCreated', categoryId: 1, content: 'TestContentCreated' });
    expect(data4.text).toEqual('Por favor escribe un nombre válido. ');
  });
});

describe('PUT /news/:id', () => {
  test('should respond with a 200 status code', async () => {
    const data = await request(app).put('/news/1').send({ name: 'Actualized Name', image: 'Actualized Image', categoryId: 1, content:"Actualized Content" });
    expect(data.statusCode).toBe(200);
  });

  test('should update the entry', async () => {
    await request(app).put('/news/1').send({ name: 'Actualized Name', image: 'Actualized Image', categoryId: 1, content:"Actualized Content" });
    const data = await request(app).get('/news/1');
    expect(data.body.name).toBe('Actualized Name');
    expect(data.body.image).toBe('Actualized Image');
    expect(data.body.categoryId).toBe(1);
    expect(data.body.content).toBe('Actualized Content');
  });

  test('should be a 404 status code if the ID does not exist', async () => {
    const data = await request(app).put(`/news/blabla`).send({ name: 'Actualized Name', image: 'Actualized Image', categoryId: 1, content:"Actualized Content" })
    expect(data.statusCode).toBe(404)
  });

  test('should respond with a status code 400 when no data is received', async () => {
    const data = await request(app).put('/news/1').send({});
    expect(data.statusCode).toBe(400)
  });

  test('should respond with an error message when it does not receive the required data', async () => {
    const data = await request(app).put('/news/1').send({ name: 'TestCreated', image: 'TestImageCreated', categoryId: 1 });
    expect(data.text).toEqual('Por favor escribe un contenido válido. ');
    const data2 = await request(app).put('/news/1').send({ name: 'TestCreated', image: 'TestImageCreated', content: 'TestContentCreated' });
    expect(data2.text).toEqual('Por favor ingresa un categoryId válido. ');
    const data3 = await request(app).put('/news/1').send({ name: 'TestCreated', categoryId: 1, content: 'TestContentCreated' });
    expect(data3.text).toEqual('Por favor ingresa una imagen válida. ');
    const data4 = await request(app).put('/news/1').send({ image: 'TestImageCreated', categoryId: 1, content: 'TestContentCreated' });
    expect(data4.text).toEqual('Por favor escribe un nombre válido. ');
  });

});

describe('DELETE /news/:id', () => {
  test("should be a 404 status code if the ID does not exist", async() => {
      const data = await request(app).delete('/news/blabla')
      expect(data.statusCode).toBe(404)
  })

  test('should be 200 status code if route exist', async() => {
    await request(app).post('/news').send({ name: 'DeleteTest', image: 'DeleteTestImage', categoryId: 1, content: 'DeleteTestContent' });
    const res = await request(app).get('/news');
    const data = await request(app).delete(`/news/${res.body[res.body.length - 1].id}`)
    expect(data.statusCode).toBe(200)
  })
})