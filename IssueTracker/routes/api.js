'use strict';
const Issue = require("../models/Issue");

module.exports = function (app) {

  app.route('/api/issues/:project')

    .get(async function (req, res) {
      let project = req.params.project;

      const issues = await Issue.find({ ...req.query });
      res.status(200).json(issues)

    })

    .post(function (req, res) {
      // req.body.project = req.params.project;
      const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body
      var issue = new Issue(req.body)

      issue.save(function (err, post) {
        if (err) {
          res.status(400).send(`{ error: 'required field(s) missing' }`)
          return console.log(err);
        }

        res.status(201).json(post)
      })

    })

    .put(function (req, res) {
      let project = req.params.project;
      if (!req.body._id) res.status(400).json(`{ error: 'missing _id' }`)
      if (req.body._id && (!req.body.issue_title && !req.body.issue_text && !req.body.created_by && !req.body.assigned_to && !req.body.status_text)) res.status(400).json(`{ error: 'no update field(s) sent', '_id': ${req.body._id} `)
      try {
        Issue.findByIdAndUpdate(req.body._id, req.body, { updated_on: Date.now() }).then(() => res.status(200).json(`{ result: 'successfully updated', '_id': ${req.body._id} }`))
      }
      catch (e) {
        console.log('ERROR', e.message);
        res.status(400).json(`{ error: 'could not update', '_id': ${req.body._id} }`)
        return console.log(e);
      }
    })

    .delete(async function (req, res) {
      let project = req.params.project;

      if (!req.body._id) res.status(400).json(`{ error: 'missing _id' }`)
      let response
      try {
        response = await Issue.deleteOne({ _id: req.body._id })
        console.log(response.deletedCount)
        if (response.deletedCount === 1) { res.status(200).json(`{ result: 'successfully deleted', _id: ${req.body._id} }`) }
        
      } catch (e) {
        res.status(400).json(`{ error: 'could not delete', _id: ${req.body._id} }`)
        return console.log('DELETEERROR', e);
      }
    });

};
