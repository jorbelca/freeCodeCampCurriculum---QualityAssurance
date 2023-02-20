'use strict';
const Issue = require("../models/Issue");

module.exports = function (app) {

  app.route('/api/issues/:project')
    .get(async function (req, res) {
      req.query.project = req.params.project;

      const issues = await Issue.find({ ...req.query });

      if (!issues) {
        return res.json('{ "No project called"' + req.query.project + '"found" }');
      }
      var resp = issues.map((d) => ({
        assigned_to: d.assigned_to,
        status_text: d.status_text,
        open: d.open,
        _id: d._id,
        issue_title: d.issue_title,
        issue_text: d.issue_text,
        created_by: d.created_by,
        created_on: d.created_on,
        updated_on: d.updated_on,
      }));

      return res.json(resp);
    })

    .post(async function (req, res, err) {
      req.body.project = req.params.project;
      const { issue_title, issue_text, created_by } = req.body

      if (!issue_title || !issue_text || !created_by) {
        return res.json({ error: "required field(s) missing" });
      }
      var issue = await Issue.create(req.body)

      issue.save(function (err, post) {
        if (err) {
          console.log(err);
          return res.json({ error: "required field(s) missing" })
        }
        return res.json(post)
      })

    })

    .put(async function (req, res) {
      let project = req.params.project;
      let id = req.body._id

      if (!id) { return res.json({ error: "missing _id" }) }
      if (id && (!req.body.issue_title && !req.body.issue_text && !req.body.created_by && !req.body.assigned_to && !req.body.status_text)) {
        return res.json({ error: "no update field(s) sent", _id: id })
      }

      try {
        const response = await Issue.findByIdAndUpdate(req.body._id, { ...req.body, updated_on: Date.now() })
        if (!response) {
          return res.json({ error: "could not update", _id: id })
        }
        return res.json({ result: "successfully updated", _id: id })
      }
      catch (err) {
        console.log('UPDATEERROR', err);
        return res.json({ error: "could not update", _id: id })
      }
    })

    .delete(async function (req, res) {
      let project = req.params.project;
      let id = req.body._id
      if (!id) return res.json({ error: "missing _id" })

      try {
        const deletedIssue = await Issue.findByIdAndDelete(id)
        if (!deletedIssue) return res.json({ error: "could not delete", _id: id })
        if (deletedIssue) return res.json({ result: "successfully deleted", _id: id })
      } catch (err) {
        console.log('DELETEERROR', err);
        return res.json({ error: "could not delete", _id: id })
      }
    });

};