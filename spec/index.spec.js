const Request = require("request");

describe("Server", () => {
    let server;
    beforeAll(() => {
        server = require("../app");
    });
    afterAll(() => {
        // server.close();
    });
    describe("GET /", () => {
        const data = {};
        beforeAll((done) => {
            Request.get("http://localhost:1234/", (error, response, body) => {
                data.status = response.statusCode;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
    });
    describe("GET /dashboard", () => {
        const data = {};
        beforeAll((done) => {
            Request.get("http://localhost:1234/dashboard", (error, response, body) => {
                data.status = response.statusCode;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
    });
});