import supertest from "supertest";
import indexRouter from "./routes/index";
import bookRouter from "./routes/book";
import authorRouter from "./routes/authors";

// Author test
describe("Test author routes", ()=>{

    describe("signup as an author",()=>{
        test("should respond with a 200 status code", async()=>{
            const response = await request(authorRouter).post("/signup").send({
                author:"ABC",
                age:30,
                email:"jamesPaul@gmail.com",
                password:"12345",
                address:"20 siju street"
            }) 
            expect(response.statusCode).toBe(200)
        })
    })
})
