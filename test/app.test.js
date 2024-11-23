const request = require('supertest');
const http = require('http');
const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, GitHub Actions!\n');
});

test('GET / responds with correct message', async () => {
  const response = await request(app).get('/');
  expect(response.status).toBe(200);
  expect(response.text).toBe('Hello, GitHub Actions!\n');
});
