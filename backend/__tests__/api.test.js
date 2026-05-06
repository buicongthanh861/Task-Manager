const request = require('supertest');

jest.mock('../src/db/models', () => ({
  sequelize: { authenticate: jest.fn(), sync: jest.fn() },
  User: { findOne: jest.fn(), findByPk: jest.fn(), create: jest.fn() },
  Task: { findAll: jest.fn(), findOne: jest.fn(), create: jest.fn() },
}));

const app = require('../src/index');

test('GET /health → 200', async () => {
  const res = await request(app).get('/health');
  expect(res.status).toBe(200);
  expect(res.body.status).toBe('ok');
});

test('POST /api/auth/register with empty body → 400', async () => {
  const res = await request(app).post('/api/auth/register').send({});
  expect(res.status).toBe(400);
});
