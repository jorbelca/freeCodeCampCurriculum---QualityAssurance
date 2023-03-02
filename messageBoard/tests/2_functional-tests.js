const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let newTh = {
  board: 'general',
  text: "ChaiTest",
  delete_password: "Test"
}

let replyTh = {
  text: newTh.text + 'reply',
  delete_password: newTh.delete_password
}

suite('Functional Tests', function () {
  test('Creating a new thread: POST request to /api/threads/{board}', function (done) {
    chai.request(server)
      .post('/api/threads/general')
      .send(newTh)

      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.include(res.text, '<!DOCTYPE html>');
        done();
      });
  });

  test('Viewing the 10 most recent threads with 3 replies each: GET request to /api/threads/{board}', function (done) {
    chai.request(server)
      .get('/api/threads/general')

      .end(function (err, res) {
        res.body.map(n => { if (n.text == newTh.text) { newTh._id = n._id } })
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an object');
        assert.isAtMost(res.body.length, 10);
        assert.property(res.body[0], '_id', 'The response should contain the _id key');
        assert.property(res.body[0], 'text', 'The response should contain the text key');
        assert.isAtMost(res.body[0].replies.length, 3);
        done();
      });
  });

  test('Reporting a thread: PUT request to /api/threads/{board}', function (done) {
    chai.request(server)
      .put('/api/threads/general')
      .send({
        report_id: newTh._id
      })

      .end(function (err, res) {

        assert.equal(res.status, 200);
        assert.equal(res.text, 'reported');
        done();
      });
  });

  test('Creating a new reply: POST request to /api/replies/{board}', function (done) {
    chai.request(server)
      .post('/api/replies/general/')
      .send({
        ...replyTh,
        thread_id: newTh._id,
      })

      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.include(res.text, '<!DOCTYPE html>');
        done();
      });
  });

  test('Viewing a single thread with all replies: GET request to /api/replies/{board}', function (done) {
    chai.request(server)
      .get('/api/replies/general?thread_id=' + newTh._id)


      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'response should be an object');
        assert.property(res.body, 'replies', 'The response should contain the replies key');
        assert.equal(res.body.replies[0].text, replyTh.text);
        replyTh._id = res.body.replies[0]._id
        done();
      });
  });

  test('Reporting a reply: PUT request to /api/threads/{board}', function (done) {
    chai.request(server)
      .put('/api/replies/general/')
      .send({
        reply_id: replyTh._id
      })


      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'reported');
        done();
      });
  });

  test('Deleting a reply with the incorrect password: DELETE request to /api/replies/{board} with an invalid delete_password', function (done) {
    chai.request(server)
      .delete('/api/replies/general')
      .send({
        delete_password: replyTh.delete_password + 'a',
        reply_id: replyTh._id
      })

      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'incorrect password');
        done();
      });
  });

  test('Deleting a reply with the correct password: DELETE request to /api/replies/{board} with a valid delete_password', function (done) {
    chai.request(server)
      .delete('/api/replies/general')
      .send({
        delete_password: replyTh.delete_password,
        reply_id: replyTh._id
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'success');
        done();
      });
  });

  test('Deleting a thread with the incorrect password: DELETE request to /api/threads/{board} with an invalid delete_password', function (done) {
    chai.request(server)
      .delete('/api/threads/general')
      .send({
        delete_password: newTh.delete_password + 'a',
        thread_id: newTh._id
      })

      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'incorrect password');
        done();
      });
  });

  test('Deleting a thread with the correct password: DELETE request to /api/threads/{board} with an valid delete_password', function (done) {
    chai.request(server)
      .delete('/api/threads/general')
      .send({
        delete_password: newTh.delete_password,
        thread_id: newTh._id
      })

      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'success');
        done();
      });
  });
});
