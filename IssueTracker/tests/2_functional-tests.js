const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const server = require('../server');

chai.use(chaiHttp);

let ID = '63f09571cde107f28374c220'
suite('Functional Tests', function () {
  this.timeout(5000);
  // #1
  test.skip('Create an issue with every field: POST request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .post('/api/issues/apitest/')
      .send({
        issue_title: 'Issue ',
        issue_text: 'Functional Test',
        created_by: 'jorbelcaTEST',
        assigned_to: 'TEST',
        status_text: 'TEEEST',
      })

      .end(function (err, res) {
        assert.equal(res.status, 201);
        expect(res.text).to.include('{"issue_title":"Issue ","issue_text":"Functional Test","created_by":"jorbelcaTEST","assigned_to":"TEST","status_text":"TEEEST","open":true');
        done();
      });
  });
  // #2
  test.skip('Create an issue with only required fields: POST request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .post('/api/issues/apitest/')
      .send({
        issue_title: 'Issue',
        issue_text: 'Functional Test',
        created_by: 'jorbelcaTEST'
      })

      .end(function (err, res) {
        assert.equal(res.status, 201);
        expect(res.text).to.include('{"issue_title":"Issue","issue_text":"Functional Test","created_by":"jorbelcaTEST","assigned_to":"","status_text":"","open":true');
        done();
      });
  });
  // #3
  test.skip('Create an issue with missing required fields: POST request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .post('/api/issues/apitest/')
      .send({
        issue_title: 'Issue',
        issue_text: 'Functional Test',
      })

      .end(function (err, res) {
        assert.equal(res.status, 400);
        console.log(res.text);
        expect(res.text).to.equal(`{ error: 'required field(s) missing' }`);
        done();
      });
  });
  // #4
  test.skip('View issues on a project: GET request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .get('/api/issues/apitest/')

      .end(function (err, res) {
        assert.equal(res.status, 200);
        expect(res.text).to.include('"issue_title":"Issue ","issue_text":"Functional Test","created_by":"jorbelcaTEST","assigned_to":"TEST","status_text":"TEEEST","open":true');
        done();
      });
  });
  // #5
  test.skip('View issues on a project with one filter: GET request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .get('/api/issues/{project}?open=false')

      .end(function (err, res) {
        assert.equal(res.status, 200);
        expect(res.text).to.include('"open":false');
        done();
      });
  });
  // #6
  test.skip('View issues on a project with multiple filters: GET request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .get('/api/issues/{project}?open=true&issue_title=Issue')

      .end(function (err, res) {
        assert.equal(res.status, 200);
        expect(res.text).to.include('"open":true').to.include('"issue_title":"Issue"')
        done();
      });
  });
  // #7
  test.skip('Update one field on an issue: PUT request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .put('/api/issues/apitest')
      .send({
        issue_title: 'Issue',
        _id: ID
      })

      .end(function (err, res) {
        assert.equal(res.status, 200);
        expect(res.text).to.include(`result: 'successfully updated'`).to.include(`'_id': ${ID}`)
        done();
      });
  });
  // #8
  test.skip('Update multiple fields on an issue: PUT request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .put('/api/issues/apitest')
      .send({
        issue_title: 'IssueUPDATED',
        created_by: 'jorbelcaTESTUPDATED',
        _id: ID
      })

      .end(function (err, res) {
        assert.equal(res.status, 200);
        expect(res.text).to.include(`result: 'successfully updated'`).to.include(`'_id': ${ID}`)
        done();
      });
  });
  // #9
  test.skip('Update an issue with missing _id: PUT request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .put('/api/issues/apitest')
      .send({
        issue_title: 'IssueUPDATED',
        created_by: 'jorbelcaTESTUPDATED',
      })

      .end(function (err, res) {
        assert.equal(res.status, 400);
        expect(res.text).to.include(`{ error: 'missing _id' }`)
        done();
      });
  });
  // #10
  test.skip('Update an issue with no fields to update: PUT request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .put('/api/issues/apitest')
      .send({
        _id: ID
      })

      .end(function (err, res) {
        assert.equal(res.status, 400);
        expect(res.text).to.include(`{ error: 'no update field(s) sent'`).to.include(`'_id': ${ID}`)
        done();
      });
  });
  // #11
  test.skip('Update an issue with an invalid _id: PUT request to /api/issues/{project}', function (done) {
    let badID = ID + 'a'
    chai
      .request(server)
      .put('/api/issues/apitest')
      .send({
        issue_title: 'IssueUPDATED',
        created_by: 'jorbelcaTESTUPDATED',
        _id: badID
      })

      .end(function (err, res) {
        assert.equal(res.status, 400);
        expect(res.text).to.include(`{ error: 'could not update'`).to.include(`'_id': ${badID}`)
        done();
      });
  });
  // #12
  test.skip('Delete an issue with missing _id: DELETE request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .delete('/api/issues/apitest')
      .send({})

      .end(function (err, res) {
        assert.equal(res.status, 400);
        expect(res.text).to.include(`{ error: 'missing _id' }`)
        done();
      });
  });
  // #13
  test.skip('Delete an issue with an invalid _id: DELETE request to /api/issues/{project}', function (done) {
    let badID = ID + 'a'
    chai
      .request(server)
      .delete('/api/issues/apitest')
      .send({
        _id: badID
      })

      .end(function (err, res) {
        assert.equal(res.status, 400);
        expect(res.text).to.include(` error: 'could not delete'`).to.include(`'_id': ${badID}`)
        done();
      });
  });
  // #14
  test.skip('Delete an issue: DELETE request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .delete('/api/issues/apitest')
      .send({
        _id: ID
      })

      .end(function (err, res) {
        assert.equal(res.status, 200);
        expect(res.text).to.include(`{ result: 'successfully deleted'}`).to.include(`'_id': ${ID}`)
        done();
      });
  });
});



