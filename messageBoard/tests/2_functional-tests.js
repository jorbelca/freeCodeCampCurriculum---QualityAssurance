const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  test.skip('Creating a new thread: POST request to /api/threads/{board}', function (done) {
    chai.request(server)
      .post('/api/b/general')

      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'response should be an object');
        assert.property(res.body, 'stockData', 'The response should contain the stockData key');
        assert.equal(res.body.stockData.stock, symbol1);
        done();
      });
  });

  test('Viewing the 10 most recent threads with 3 replies each: GET request to /api/threads/{board}', function (done) {
    chai.request(server)
      .get('/api/threads/general')

      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an object');
        assert.isAtMost(res.body.length, 10);
        assert.property(res.body[0], '_id', 'The response should contain the _id key');
        assert.property(res.body[0], 'text', 'The response should contain the text key');
        assert.isAtMost(res.body[0].replies.length, 3);
        done();
      });
  });

  test.skip('Deleting a thread with the incorrect password: DELETE request to /api/threads/{board} with an invalid delete_password', function (done) {
    chai.request(server)
      .delete('/api/b/general')

      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'response should be an object');
        assert.property(res.body, 'stockData', 'The response should contain the stockData key');
        assert.equal(res.body.stockData.stock, symbol1);
        done();
      });
  });

});
