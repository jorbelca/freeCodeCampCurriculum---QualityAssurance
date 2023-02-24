const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('Viewing one stock: GET request to /api/stock-prices/', function (done) {
    chai.request(server)
      .get('/api/stock-prices?stock=' + symbol1)

      .end(function (err, res) {
        firstLikes = res.body.stockData.likes
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'response should be an object');
        assert.property(res.body, 'stockData', 'The response should contain the stockData key');
        assert.equal(res.body.stockData.stock, symbol1);
        done();
      });
  });

});
