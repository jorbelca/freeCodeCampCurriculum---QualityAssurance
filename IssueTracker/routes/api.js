'use strict';
const Issue = require("../models/Issue");

module.exports = function (app) {

  app.route('/api/issues/:project')

    .get(async function (req, res) {
      let project = req.params.project;
      const issues = await Issue.find({ ...req.query });


    })

    .post(async function (req, res) {
      req.body.project = req.params.project;
      const { project, issue_title, issue_text, created_by, assigned_to, status_text } = req.body
      var issue = new Issue(req.body)
      console.log(issue);
      issue.save(function (err, post) {
        if (err) { return console.log(err); }
        res.json(201, post)
      })

    })

    .put(async function (req, res) {
      let project = req.params.project;


    })

    .delete(async function (req, res) {
      let project = req.params.project;

    });

};
