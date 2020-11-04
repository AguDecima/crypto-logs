const request = require('supertest');
const faker = require('faker');
const app = require('../app');
const {modifyBlock} = require('./mocks/modifyBlock');

describe("An empty message from a customer", () => {
  test("POST /send-message - failed", async () => {
    let message = { message: "" }
    const response = await request(app).post("/api/v1/send-message").send(message);
    expect(response.statusCode).toBe(400);
    let res = require('./data/send-message-response-400.json');
    expect(response.body).toEqual(res);
  });
});

describe("A different contract sent by the user", () => {
  test("POST /send-message - failed", async () => {
    let message = { stuff: faker.lorem.words() }
    const response = await request(app).post("/api/v1/send-message").send(message);
    expect(response.statusCode).toBe(400);
    let res = require('./data/send-message-response-400.json');
    expect(response.body).toEqual(res);
  });
});

describe("Messages are sent as a user", () => {
  test("POST /send-message - success", async () => {
    let attemps = process.env.ATTEMPS || 10;
    while (attemps) {
      let message = { message: faker.lorem.words() }
      const response = await request(app).post("/api/v1/send-message").send(message);
      expect(response.statusCode).toBe(200);
      let res = require('./data/send-message-response-200.json');
      expect(response.body).toEqual(res);
      attemps--;
    }
  });
});

describe("The integrity of the block is verified", () => {
  test("GET /validate-integrity - success", async () => {
    const response = await request(app).get("/api/v1/validate-integrity");
    expect(response.statusCode).toBe(200);
    let res = require('./data/validate-integrity-response-200.json');
    expect(response.body).toEqual(res);
  });
});

describe("One of the block data is modified", () => {
  test("GET /validate-integrity - failed", async () => {
    await modifyBlock();
    const response = await request(app).get("/api/v1/validate-integrity");
    expect(response.statusCode).toBe(400);
    let res = require('./data/validate-integrity-response-400.json');
    expect(response.body).toEqual(res);
  });
});