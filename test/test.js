var request = require('request'),
    expect = require('chai').expect,
    baseUrl = 'http://localhost:3000/';

// var email = ()
//     password = 

// DESCRIBE WHAT WE ARE TESTING
  // SAY WHAT BEHAVIOR 'IT' AUGHT TO HAVE
    // SEND THE REQUEST
      // USE CHAI-EXPECT TO EXPECT THE STATUS RESULT
      // CHECK FALSE VALUE TO SEE IF WE CAN MAKE TEST FAIL
      // CALL DONE();

describe('GET /', function() {
  it('should return statusCode 200', function(done) {
    request(baseUrl, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

describe('GET /api/posts', function() {
  it('should return statusCode 200', function(done) {
    request(baseUrl + '/api/posts', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

describe('GET /signup', function() {
  it('should return statusCode 200', function(done) {
    request(baseUrl + '/signup', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

describe('GET /login', function() {
  it('should return statusCode 200', function(done) {
    request(baseUrl + '/login', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});