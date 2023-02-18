'use strict';
const Issue = require("../models/Issue");

module.exports = function (app) {

  app.route('/api/issues/:project')
    .get(async function (req, res) {
      let project = req.params.project;

      const issues = await Issue.find(req.query);
      res.status(200).json(issues)
      if (!issues) {
        throw new NotFoundError(`No project called ${req.params.project} found`);
      }
    })

    .post(function (req, res, err) {
      // req.body.project = req.params.project;
      const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body
      if (!issue_title || !issue_text || !created_by) {
        return res.status(400).json({ error: "required field(s) missing" });
      }
      var issue = new Issue(req.body)

      issue.save(function (err, post) {
        if (err) {
          console.log(err);
          return res.status(400).json({ error: 'required field(s) missing' })
        }
        return res.status(201).json(post)
      })

    })

    .put(async function (req, res) {
      let project = req.params.project;
      let id = req.body._id

      if (!id) { return res.status(400).json({ error: "missing _id" }) }
      if (id && (!req.body.issue_title && !req.body.issue_text && !req.body.created_by && !req.body.assigned_to && !req.body.status_text)) {
        return res.status(400).json({ error: "no update field(s) sent", _id: id })
      }

      try {
        const response = await Issue.findByIdAndUpdate(req.body._id, { ...req.body, updated_on: Date.now() })
        return res.status(200).json({ result: "successfully updated", _id: id })
      }
      catch (err) {
        console.log('UPDATEERROR', err);
        return res.status(400).json({ error: "could not update", _id: id })

      }
    })

    .delete(async function (req, res) {
      let project = req.params.project;
      let id = req.body._id
      if (!id) res.status(400).json({ error: "missing _id", _id: id })

      try {
        const deletedIssue = await Issue.findByIdAndDelete(id)
        if (deletedIssue) res.status(200).json({ result: "successfully deleted", _id: id })
      } catch (err) {
        console.log('DELETEERROR', err);
        return res.status(400).json(`{ error: 'could not delete', _id: ${id} }`)
      }
    });

};