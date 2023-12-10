const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
   test("It should respond with 200 success", async () => {
      const response = await request(app)
         .get("/launches")
         .expect("Content-Type", /json/)
         .expect(200);
   });
});

describe("Test POST /launch", () => {
   const completeLaunchData = {
      mission: "USS Enterprise",
      rocket: "DCC 1888-G",
      target: "Kepler-6762 A",
      launchDate: "December 20, 2050",
   };

   const launchDataWithoutDate = {
      mission: "USS Enterprise",
      rocket: "DCC 1888-G",
      target: "Kepler-6762 A",
   };

   const launchDataWithInvalidDate = {
      mission: "USS Enterprise",
      rocket: "DCC 1888-G",
      target: "Kepler-6762 A",
      launchDate: "hello",
   };

   test("It should respond with 201 created", async () => {
      const response = await request(app)
         .post("/launches")
         .send(completeLaunchData)
         .expect("Content-Type", /json/)
         .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(responseDate).toBe(requestDate);

      expect(response.body).toMatchObject(launchDataWithoutDate);
   });

   test("It should catch missing required properties", async () => {
      const response = await request(app)
         .post("/launches")
         .send(launchDataWithoutDate)
         .expect("Content-Type", /json/)
         .expect(400);

      expect(response.body).toStrictEqual({
         error: "Missing required launch property",
      });
   });
   test("It should catch invalid dates", async () => {
      const response = await request(app)
         .post("/launches")
         .send(launchDataWithInvalidDate)
         .expect("Content-Type", /json/)
         .expect(400);

      expect(response.body).toStrictEqual({
         error: "Invalid launch date",
      });
   });
});
