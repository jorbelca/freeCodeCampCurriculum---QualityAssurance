'use strict';

const Reply = require("../models/Reply");
const Thread = require("../models/Thread");

module.exports = function (app) {
  app.route('/api/threads/:board')
    .get(async (req, res) => {
      const { board } = req.params

      const threads = await Thread.find({ board: board })
      console.log('GET THREADS', threads);
      return res.status(200).json(threads)

    })

    .post(async (req, res) => {
      const { text, delete_password, board } = req.body

      const newThread = new Thread({
        text: text,
        delete_password: delete_password,
        board: board
      })

      const saveInDb = await newThread.save()

      console.log("POST THREAD", saveInDb);
      return res.status(200).json(saveInDb)
    })

    .put((req, res) => {
      const { report_id } = req.body
      console.log("PUT THREAD");
    })

    .delete(async (req, res) => {
      const { delete_password, thread_id } = req.body
      const singleThread = await Thread.findOne({ thread_id })
      console.log("DELETE THREAD", singleThread, delete_password);

      if (singleThread.delete_password === delete_password) {
        singleThread.delete()
        return res.status(200).json('success')
      }
    })


  // REPLIES
  app.route('/api/replies/:board')
    .get(async (req, res) => {
      const { thread_id } = req.params

      const threads = await Reply.find({ thread_id: thread_id })
      console.log(threads);
      return res.status(200).json(...threads)

    })

    .post(async (req, res) => {
      const { text, delete_password, thread_id } = req.body

      const newThread = new Reply({
        text: text,
        delete_password: delete_password,
        thread_id: thread_id
      })

      const saveInDb = await newThread.save()

      console.log(newThread);
      return res.status(200).json(saveInDb)
    })

    .put((req, res) => {
      const { report_id } = req.body

    })

    .delete(async (req, res) => {
      const { delete_password, thread_id } = req.body
      const singleThread = await Reply.find({ thread_id: thread_id })
      if (singleThread.delete_password === delete_password) {
        singleThread.delete()
        return res.status(200).json('deleted')
      }

    })


};
