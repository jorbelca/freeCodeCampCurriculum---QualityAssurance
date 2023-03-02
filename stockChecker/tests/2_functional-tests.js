const chaiHttp = require('chai-http');
import chai from 'chai';
import pkg from 'chai';
const { assert, use, request } = pkg;

import server from '../server.js';

chai.use(chaiHttp);

let IPgenerate = (Math.floor(Math.random() * 255) + 1) + "." + (Math.floor(Math.random() * 255)) + "." + (Math.floor(Math.random() * 255)) + "." + (Math.floor(Math.random() * 255));
let IP
const symbol1 = 'F'
const symbol2 = "TSLA"
let firstLikes

suite('Functional Tests', function () {
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

  test('Viewing one stock and liking it: GET request to /api/stock-prices/', function (done) {
    IP = IPgenerate
    chai.request(server)
      .get('/api/stock-prices?stock=' + symbol1 + '&like=true')
      .set('X-Forwarded-For', IP)

      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'response should be an object');
        assert.property(res.body, 'stockData', 'The response should contain the stockData key');
        assert.equal(res.body.stockData.likes, firstLikes + 1);
        done();
      });
  });

  test('Viewing the same stock and liking it again: GET request to /api/stock-prices/', function (done) {
    chai.request(server)
      .get('/api/stock-prices?stock=' + symbol1 + '&like=true')
      .set('X-Forwarded-For', IP)

      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'response should be an object');
        assert.property(res.body, 'stockData', 'The response should contain the stockData key');
        assert.equal(res.body.stockData.likes, firstLikes + 1);
        done();
      });
  });


  test('Viewing two stocks: GET request to /api/stock-prices/', function (done) {
    chai.request(server)
      .get('/api/stock-prices?stock=' + symbol1 + '&stock=' + symbol2)

      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'response should be an object');
        assert.property(res.body, 'stockData', 'The response should contain the stockData key');
        assert.equal(res.body.stockData[0].stock, symbol1 || symbol2);
        assert.equal(res.body.stockData[1].stock, symbol2 || symbol1);
        assert.exists(res.body.stockData[0].rel_likes, 'The response should contain the rel_likes key');
        done();
      });
  });

  test('Viewing two stocks and liking them: GET request to /api/stock-prices/', function (done) {
    chai.request(server)
      .get('/api/stock-prices?stock=' + symbol1 + '&stock=' + symbol2 + '&like=true')
      .set('X-Forwarded-For', IPgenerate)

      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'response should be an object');
        assert.property(res.body, 'stockData', 'The response should contain the stockData key');
        assert.exists(res.body.stockData[0].rel_likes, 'The response should contain the rel_likes key');
        done();
      });
  });

});
