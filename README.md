
![Screenshot 2024-11-23 234057](https://github.com/user-attachments/assets/28e1ff13-6529-4893-9705-79464a1e3c18)
![Screenshot 2024-11-23 234217](https://github.com/user-attachments/assets/891867f7-727f-4159-ba8f-4d0c7656db93)

untuk melakukan project ini pertama yaitu buat folder terlebih dahulu
 contoh (sebaiknya buak git bash command di folder langsung)
 mkdir ci-cd-nama
 cd ci-cd-nama

lalu masukan npm init -y

buat file app.js dengan isi:
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, GitHub Actions!\n');
});
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});


lalu bikin folder isi node_modules di .gitignore

lalu npm install --save-dev jest supertest

lalu bikin ini di bash
mkdir test
touch test/app.test.js

dengan isi:
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


selanjutnya
git init
git add .
git commit -m "Initial commit with basic app and test"
git branch -M main
git remote add origin <URL_REPOSITORY_GITHUB>
git push -u origin main

lalu buat folder :
mkdir -p .github/workflows
touch .github/workflows/ci.yml

dengan isi 
name: Continuous Integration

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test


lalu bikin ini touch .github/workflows/cd.yml

name: Continuous Deployment

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: Deploy to GitHub Pages
        run: |
          npm run build
          mkdir -p out
          echo "Hello from CI/CD Deployment" > out/index.html

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out

terkahir Buka Settings → Pages → Source dan pilih branch gh-pages.


