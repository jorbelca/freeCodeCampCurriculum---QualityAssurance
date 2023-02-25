'use strict';

const Reply = require("../models/Reply");
const Thread = require("../models/Thread");

module.exports = function (app) {
  app.route('/api/threads/:board')
    .get(async (req, res) => {
      const { board } = req.params

      let threads = await Thread.find({ board: board }).populate('replies')
      let response = threads.map((thread) => {
        return {
          _id: thread._id,
          text: thread.text,
          created_on: thread.created_on,
          bumped_on: thread.bumped_on,
          // replies: [thread.replies[0], thread.replies[1], thread.replies[2]],
          replycount: thread.replies.length
        }
      })

      console.log('GET THREADS', response,threads);
      return res.status(200).json(response)

    })

    .post(async (req, res) => {
      const { board } = req.params
      const { text, delete_password } = req.body

      const newThread = new Thread({
        text: text,
        delete_password: delete_password,
        board: board
      })

      const saveInDb = await newThread.save()

      console.log("POST THREAD");

      return res.redirect('/b/' + board)
    })

    .put(async (req, res) => {
      const { report_id } = req.body

      try {
        const reported = await Thread.findByIdAndUpdate(report_id, { $set: { reported: true } }, { returnDocument: 'after' })
        console.log(reported);
        if (reported) {
          res.redirect('/api/threads/' + board)
          return res.status(200).json('reported')
        }
        if (!reported) return res.status(400).json('error')

      } catch (error) {
        return res.status(400).json('error')
      }

    })

    .delete(async (req, res) => {
      const { delete_password, thread_id } = req.body

      try {
        const singleThread = await Thread.findById(thread_id)
        console.log("DELETE THREAD", singleThread, delete_password);

        if (singleThread.delete_password === delete_password) {
          singleThread.delete()
          return res.status(200).json('success')
        }
        return res.status(401).json('incorrect password')
      } catch (error) {
        return res.status(401).json(error)
      }

    })


  // REPLIES
  app.route('/api/replies/:board')
    .get(async (req, res) => {
      const { thread_id } = req.query

      const replies = await Thread.findOne({ _id: thread_id }).populate('replies')
      console.log("GET REPLIES", replies);
      return res.status(200).json(replies)

    })

    .post(async (req, res) => {
      const { text, delete_password, thread_id } = req.body

      const newReply = new Reply({
        text: text,
        delete_password: delete_password,
        thread: thread_id
      })

      try {
        const saveInDb = await newReply.save()
        if (saveInDb) {
          const updateThread = await Thread.findById(thread_id)
          updateThread.replies.push(saveInDb._id)
          updateThread.bumped_on = Date.now()
          updateThread.save()
        }

      } catch (error) {
        return res.status(400).json('error')
      }

      console.log("POST REPLY");
      return res.status(201).json('new reply')
    })

    .put(async (req, res) => {
      const { reply_id } = req.body
      try {
        const reported = await Reply.findByIdAndUpdate(reply_id, { $set: { reported: true } }, { returnDocument: 'after' })

        if (reported) return res.status(200).json('reported')
        if (!reported) return res.status(400).json('error')
      } catch (error) {
        return res.status(400).json('error')
      }
    })

    .delete(async (req, res) => {
      const { delete_password, thread_id } = req.body
      const singleReply = await Reply.findOne({ thread_id: thread_id })

      if (singleReply.delete_password === delete_password) {
        singleReply.text = '[deleted]'
        singleReply.save()
        return res.status(200).json('deleted')
      }
      return res.status(401).json('incorrect password')
    })


};
