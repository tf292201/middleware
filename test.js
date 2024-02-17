

const request = require('supertest');

const app = require('./app');

let items = require('./fakeDb');

let chips = { name: 'chips', price: 1.99 };
let soda = { name: 'soda', price: 2.99 };
let candy = { name: 'candy', price: 0.99 };

beforeEach(() => {
  items.push(chips);
  items.push(soda);
  items.push(candy);
});

afterEach(() => {
  items.length = 0;
}
);

describe('GET /shopping-list', () => {
  test('Get all items', async () => {
    const res = await request(app).get('/shopping-list');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([chips, soda, candy]);
    expect(res.body.length).toBe(3);
  });
});

describe('GET /shopping-list/:name', () => {
  test('Get one item', async () => {
    const res = await request(app).get('/shopping-list/chips');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(chips);
  });
  test('Respond with 404 for invalid item', async () => {
    const res = await request(app).get('/shopping-list/invalid');
    expect(res.statusCode).toBe(404);
  });
});

describe('PATCH /shopping-list/:name', () => {
    test('Update an item', async () => {
        const res = await request(app)
        .patch('/shopping-list/chips')
        .send({ name: 'new chips' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ updated: { name: 'new chips', price: 1.99 } });
    });
    test('Respond with 404 for invalid item', async () => {
        const res = await request(app)
        .patch('/shopping-list/invalid')
        .send({ name: 'new chips' });
        expect(res.statusCode).toBe(404);
    });
    });

describe('DELETE /shopping-list/:name', () => {
  test('Delete an item', async () => {
    const res = await request(app).delete('/shopping-list/chips');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Deleted' });
  });
  test('Respond with 404 for invalid item', async () => {
    const res = await request(app).delete('/shopping-list/invalid');
    expect(res.statusCode).toBe(404);
  });
}); 

describe('POST /shopping-list', () => {
  test('Create a new item', async () => {
    const res = await request(app)
      .post('/shopping-list')
      .send({ name: 'gum', price: 0.99 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ name: 'gum', price: 0.99 });
  });
});




