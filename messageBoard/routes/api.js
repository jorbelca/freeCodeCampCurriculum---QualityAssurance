'use strict';

const Reply = require("../models/Reply");
const Thread = require("../models/Thread");

module.exports = function (app) {
  app.route('/api/threads/:board')
    .get(async (req, res) => {
      const { board } = req.params

      try {
        let threads = await Thread.find({ board: board }).select("text created_on bumped_on _id replies").sort({ bumped_on: '-1' }).limit(10).populate({ path: 'replies', select: '_id thread text created_on', options: { sort: [{ created_on: '-1' }] } })
        let response = threads.map((thread) => {
          return {
            _id: thread._id,
            text: thread.text,
            created_on: thread.created_on,
            bumped_on: thread.bumped_on,
            replies: thread.replies.reduce((accumulator, currentValue, currentIndex) => {
              if (currentIndex <= 2) {
                accumulator.push(currentValue);
              }
              return accumulator;
            }, []),
            replycount: thread.replies.length
          }
        })
        if (!threads || !response) return res.status(400).json('error')

        return res.status(200).json(response)
      } catch (error) {
        return res.status(400).json(error)
      }
    })

    .post(async (req, res) => {
      const { board } = req.params
      const { text, delete_password } = req.body

      try {
        const newThread = new Thread({
          text: text,
          delete_password: delete_password,
          board: board
        })

        const saveInDb = await newThread.save()



        if (!saveInDb) return res.status(400).send('error')
        return res.redirect('/b/' + board)

      } catch (error) {
        return res.status(400).json(error)
      }
    })

    .put(async (req, res) => {
      const { report_id } = req.body

      try {
        const reported = await Thread.findByIdAndUpdate({ _id: report_id }, { $set: { reported: true } })


        if (!reported) return res.status(400).send('error')
        return res.status(200).send('reported')

      } catch (error) {
        return res.status(400).json(error)
      }

    })

    .delete(async (req, res) => {
      const { delete_password, thread_id } = req.body

      try {
        const singleThread = await Thread.findById(thread_id)

        if (singleThread.delete_password === delete_password) {
          singleThread.delete()
          return res.status(200).send('success')
        }
        return res.send('incorrect password')
      } catch (error) {
        return res.status(401).json(error)
      }

    })


  // REPLIES
  app.route('/api/replies/:board')
    .get(async (req, res) => {
      const { thread_id } = req.query

      try {
        let principalThread = await Thread.findOne({ _id: thread_id }).select("text created_on bumped_on _id replies").populate({ path: 'replies', select: { "text": 1, "created_on": 1, "thread": 1 }, options: { sort: [{ created_on: '-1' }] } },
        )

        if (!principalThread) return res.status(400).json('error')

        if (principalThread) return res.status(200).json(principalThread)
      } catch (error) {
        return res.status(400).json(error)
      }
    })

    .post(async (req, res) => {
      const { board } = req.params
      const { text, delete_password, thread_id } = req.body

      const newReply = new Reply({
        text: text,
        delete_password: delete_password,
        thread: thread_id
      })

      try {
        const saveInDb = await newReply.save()
        const updateThread = await Thread.findById(thread_id)

        if (saveInDb) {
          updateThread.replies.push(saveInDb._id)
          updateThread.bumped_on = saveInDb.created_on
          updateThread.save()
        }

      } catch (error) {
        return res.status(400).json(error)
      }

      return res.redirect('/b/' + board)
    })

    .put(async (req, res) => {
      const { reply_id } = req.body
      try {
        const reported = await Reply.findByIdAndUpdate(reply_id, { $set: { reported: true } })

        if (reported) return res.status(200).send('reported')
        if (!reported) return res.status(400).json('error')
      } catch (error) {
        return res.status(400).json(error)
      }
    })

    .delete(async (req, res) => {
      const { delete_password, reply_id } = req.body

      try {
        const singleReply = await Reply.findOne({ _id: reply_id })

        if (singleReply.delete_password === delete_password) {
          singleReply.text = '[deleted]'
          singleReply.save()
          return res.status(200).send('success')
        }
        return res.send('incorrect password')
      } catch (error) {
        return res.status(401).json(error)
      }
    })

};
