const supertest = require("supertest");
const { app, httpServer } = require("../../server"); // Import your main app instance

const request = supertest(app);

describe("User Controller - Integration Tests", () => {
  afterAll((done) => {
    httpServer.close(done);
  });

  it("should register a new user", async () => {
    const userData = {
      userName: "TestUser",
      email: "test@example.com",
      password: "password123",
    };

    const response = await request.post("/users/register").send(userData);
    console.log("response", response);

    // expect(response.status).toBe(201);
    expect(response.body.success).toBe("User created");
    // Add more assertions as needed
  });

  // Add more integration tests for other scenarios
});
