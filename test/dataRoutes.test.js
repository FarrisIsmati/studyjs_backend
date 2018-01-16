const should        = require("chai").should()
const expect        = require("chai").expect
const supertest     = require("supertest")
const api           = supertest("http://localhost:3001/data")
const token         = process.env.TOKEN

describe("GET /user/:token", function () {
  it("should return a user given a proper token", function (done) {
    api
      .get("/user/" + token)
      .set("Accept", "application/json")
      .expect(200, done)
  })
})

post('/user/topic/:token'

describe("GET /user/topic/:token", function () {
  //Need to get full user back and length of topics
  //Then expect the response.body.domain.topics.length to equal 1+ whatever it was supposed to be
  before(function(done){
    api
      .post("/user/topic/" + token)
      .set("Accept", "application/json")
      .send({
        "name": "Mocha",
      })
      .end(done)
  })

  // it("should create a new topic", function (done) {
  //   api
  //     .get("/user/topic/" + token)
  //     .set("Accept", "application/json")
  //     .expect(response.body.length).to.equal(12)
  // })
})
