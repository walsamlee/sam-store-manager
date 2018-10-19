const Request = require("request");

describe("Server", () => {
    let server;
    beforeAll(() => {
        // server = require("../index");
        app = require("../app");
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

    describe("GET /admindash", () => {
        const data = {};
        beforeAll((done) => {
            Request.get("http://localhost:1234/admindash", (error, response, body) => {
                data.status = response.statusCode;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
    });

    describe("GET /addproduct", () => {
        const data = {};
        beforeAll((done) => {
            Request.get("http://localhost:1234/addproduct", (error, response, body) => {
                data.status = response.statusCode;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
    });

    describe("GET /attendantprofile", () => {
        const data = {};
        beforeAll((done) => {
            Request.get("http://localhost:1234/attendantprofile", (error, response, body) => {
                data.status = response.statusCode;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
    });

    describe("GET /attendants", () => {
        const data = {};
        beforeAll((done) => {
            Request.get("http://localhost:1234/attendants", (error, response, body) => {
                data.status = response.statusCode;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
    });

    describe("GET /cart", () => {
        const data = {};
        beforeAll((done) => {
            Request.get("http://localhost:1234/cart", (error, response, body) => {
                data.status = response.statusCode;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
    });

    describe("GET /deleteproduct", () => {
        const data = {};
        beforeAll((done) => {
            Request.get("http://localhost:1234/deleteproduct", (error, response, body) => {
                data.status = response.statusCode;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
    });

    describe("GET /editproduct", () => {
        const data = {};
        beforeAll((done) => {
            Request.get("http://localhost:1234/editproduct", (error, response, body) => {
                data.status = response.statusCode;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
    });

    describe("GET /product", () => {
        const data = {};
        beforeAll((done) => {
            Request.get("http://localhost:1234/product", (error, response, body) => {
                data.status = response.statusCode;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
    });

    describe("GET /salerecord", () => {
        const data = {};
        beforeAll((done) => {
            Request.get("http://localhost:1234/salerecord", (error, response, body) => {
                data.status = response.statusCode;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
    });

    describe("GET /viewsales", () => {
        const data = {};
        beforeAll((done) => {
            Request.get("http://localhost:1234/viewsales", (error, response, body) => {
                data.status = response.statusCode;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
    });
});




