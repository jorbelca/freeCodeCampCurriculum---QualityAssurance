const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const server = require('../server');

chai.use(chaiHttp);

let ID
suite('Functional Tests', function () {
  this.timeout(5000);
  // #1
  test('Create an issue with every field: POST request to /api/issues/{project}', function (done) {
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
        ID = res.body._id
        assert
        expect(res.text).to.include('"issue_title":"Issue ","issue_text":"Functional Test","created_by":"jorbelcaTEST","assigned_to":"TEST","status_text":"TEEEST","open":true');
        done();
      });
  });
  // #2
  test('Create an issue with only required fields: POST request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .post('/api/issues/apitest/')
      .send({
        issue_title: 'Issue',
        issue_text: 'Functional Test',
        created_by: 'jorbelcaTEST'
      })

      .end(function (err, res) {

        expect(res.text).to.include('"issue_title":"Issue","issue_text":"Functional Test","created_by":"jorbelcaTEST","assigned_to":"","status_text":"","open":true');
        done();
      });
  });
  // #3
  test('Create an issue with missing required fields: POST request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .post('/api/issues/apitest/')
      .send({
        issue_title: 'Issue',
        issue_text: 'Functional Test',
      })

      .end(function (err, res) {
        assert
        expect(res.text).to.contain('{"error":"required field(s) missing"}');
        done();
      });
  });
  // #4
  test('View issues on a project: GET request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .get('/api/issues/apitest/')
      .end(function (err, res) {
        expect(res.text).to.include('"issue_title":"Issue","issue_text":"Functional Test","created_by":"jorbelcaTEST"');
        done();
      });
  });
  // #5
  test('View issues on a project with one filter: GET request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .get('/api/issues/apitest?created_by=jorbelcaTEST')

      .end(function (err, res) {
        assert
        expect(res.text).to.include(`"created_by":"jorbelcaTEST"`);
        done();
      });
  });
  // #6
  test('View issues on a project with multiple filters: GET request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .get('/api/issues/apitest?open=true&issue_title=Issue')

      .end(function (err, res) {
        assert
        expect(res.text).to.include('"open":true').to.include('"issue_title":"Issue"')
        done();
      });
  });
  // #7
  test('Update one field on an issue: PUT request to /api/issues/{project}', function (done) {

    chai
      .request(server)
      .put('/api/issues/apitest')
      .send({
        issue_title: 'Issue',
        _id: ID
      })

      .end(function (err, res) {
        assert
        expect(res.text).to.include('"result":"successfully updated"').to.include('"_id":"' + ID + '"')
        done();
      });
  });
  // #8
  test('Update multiple fields on an issue: PUT request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .put('/api/issues/apitest')
      .send({
        issue_title: 'IssueUPDATED',
        created_by: 'jorbelcaTESTUPDATED',
        _id: `${ID}`
      })

      .end(function (err, res) {
        assert
        expect(res.text).to.include('"result":"successfully updated"').to.include('"_id":"' + ID + '"')
        done();
      });
  });
  // #9
  test('Update an issue with missing _id: PUT request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .put('/api/issues/apitest')
      .send({
        issue_title: 'IssueUPDATED',
        created_by: 'jorbelcaTESTUPDATED',
      })

      .end(function (err, res) {
        assert
        expect(res.text).to.include('"error":"missing _id"')
        done();
      });
  });
  // #10
  test('Update an issue with no fields to update: PUT request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .put('/api/issues/apitest')
      .send({
        _id: ID
      })

      .end(function (err, res) {
        assert
        expect(res.text).to.include('"error":"no update field(s) sent"').to.include('"_id":"' + ID + '"')
        done();
      });
  });
  // #11
  test('Update an issue with an invalid _id: PUT request to /api/issues/{project}', function (done) {
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
        assert
        expect(res.text).to.include('"error":"could not update"').to.include('"_id":"' + badID + '"')
        done();
      });
  });
  // #12
  test('Delete an issue with missing _id: DELETE request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .delete('/api/issues/apitest')
      .send({})

      .end(function (err, res) {
        assert
        expect(res.text).to.include('"error":"missing _id"')
        done();
      });
  });
  // #13
  test('Delete an issue with an invalid _id: DELETE request to /api/issues/{project}', function (done) {
    let badID = ID + 'a'
    chai
      .request(server)
      .delete('/api/issues/apitest')
      .send({
        _id: badID
      })

      .end(function (err, res) {
        assert
        expect(res.text).to.include('"error":"could not delete"').to.include('"_id":"' + badID + '"')
        done();
      });
  });
  // #14
  test('Delete an issue: DELETE request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .delete('/api/issues/apitest')
      .send({
        _id: ID
      })

      .end(function (err, res) {
        assert
        expect(res.text).to.include('"result":"successfully deleted"').to.include('"_id":"' + ID + '"')
        done();
      });
  });
});



