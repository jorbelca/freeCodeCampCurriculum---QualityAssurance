const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  
  suite('POST /api/books with title => create book object/expect book object', function () {
    test('Test POST /api/books with title', function (done) {
      chai.request(server)
        .post('/api/books')
        .send({ title: 'TEST' })

        .end(function (err, res) {
          ID = res.body._id
          assert.equal(res.status, 200);
          assert.isObject(res.body, 'response should be an object');
          assert.property(res.body, 'title', 'The new book should contain a title');
          done();
        });
    });
  })
});
