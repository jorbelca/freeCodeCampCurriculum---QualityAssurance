/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
let ID

suite('Functional Tests', function () {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  // test.skip('#example Test GET /api/books', function (done) {
  //   chai.request(server)
  //     .get('/api/books')
  //     .end(function (err, res) {

  //       assert.equal(res.status, 200);
  //       assert.isArray(res.body, 'response should be an array');
  //       assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
  //       assert.property(res.body[0], 'title', 'Books in array should contain title');
  //       assert.property(res.body[0], '_id', 'Books in array should contain _id');
  //       done();
  //     });
  // });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function () {
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

      test('Test POST /api/books with no title given', function (done) {
        chai.request(server)
          .post('/api/books')
          .send()

          .end(function (err, res) {
            assert.equal(res.status, 400);
            assert.equal(res.body, 'missing required field title')
            done();
          });
      });

    });


    suite('GET /api/books => array of books', function () {
      test('Test GET /api/books', function (done) {
        chai.request(server)
          .get('/api/books')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body, 'response should be an array');
            done();
          });
      });

    });


    suite('GET /api/books/[id] => book object with [id]', function () {

      test('Test GET /api/books/[id] with id not in db', function (done) {
        chai.request(server)
          .get(`/api/books/${ID}a`)


          .end(function (err, res) {
            assert.equal(res.status, 400);
            assert.equal(res.body, 'no book exists');
            done();
          });
      });

      test('Test GET /api/books/[id] with valid id in db', function (done) {
        chai.request(server)
          .get('/api/books/' + ID)


          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body)
            assert.property(res.body, 'comments', 'Book should contain comments');
            assert.property(res.body, 'title', 'Book should contain title');
            assert.property(res.body, '_id', 'Book should contain _id');
            done();
          });
      });

    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function () {
      test('Test POST /api/books/[id] with comment', function (done) {
        let com = "TESTComment"
        chai.request(server)
          .post('/api/books/' + ID)
          .send({ comment: com })

          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body)
            assert.property(res.body, 'comments', 'Book should contain comments');
            assert.property(res.body, 'title', 'Book should contain title');
            assert.property(res.body, '_id', 'Book should contain _id');
            assert.equal(res.body.comments[0], com)
            done();
          });
      });

      test('Test POST /api/books/[id] without comment field', function (done) {
        let com
        chai.request(server)
          .post('/api/books/' + ID)
          .send({ comment: com })

          .end(function (err, res) {
            assert.equal(res.status, 400);
            assert.equal(res.body, 'missing required field comment')
            done();
          });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function (done) {
        let com = "TESTComment"
        chai.request(server)
          .post(`/api/books/${ID}${com}`)
          .send({ comment: com })

          .end(function (err, res) {
            assert.equal(res.status, 400);
            assert.equal(res.body, 'no book exists')
            done();
          });
      });

    });

    suite('DELETE /api/books/[id] => delete book object id', function () {
      test('Test DELETE /api/books/[id] with valid id in db', function (done) {
        chai.request(server)
          .delete('/api/books/' + ID)


          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body, 'delete successful')
            done();
          });
      });

      test('Test DELETE /api/books/[id] with  id not in db', function (done) {
        chai.request(server)
          .delete(`/api/books/${ID}c`)


          .end(function (err, res) {
            assert.equal(res.status, 400);
            assert.equal(res.body, 'no book exists')
            done();
          });
      });

    });

  });

});
