
'use strict';
const Book = require("../models/Book");

module.exports = function (app) {

  app.route('/api/books')
    .get(async function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      const books = await Book.find()
      let response = books.map(n => {
        return { _id: n._id, title: n.book_title, commentcount: n.comments.length }
      })
      if (books) return res.status(200).json(response)

    })

    .post(async function (req, res) {
      let title = req.body.title;
      if (!title || title == "") return res.send('missing required field title')
      //response will contain new book object including atleast _id and title
      const newBook = await Book.create({ book_title: title })
      if (newBook) return res.status(200).json({ _id: newBook._id, title: newBook.book_title })
    })

    .delete(async function (req, res) {
      //if successful response will be 'complete delete successful'
      const deletionRes = await Book.deleteMany()
      if (!deletionRes) return res.send('theres been an error')
      return res.status(200).send('complete delete successful')
    });



  app.route('/api/books/:id')
    .get(async function (req, res) {
      let bookid = req.params.id;
      //json res format: {'_id': bookid, 'title': book_title, 'comments': [comment,comment,...]}
      try {
        const book = await Book.findById(bookid)
        if (!book) return res.send('no book exists')
        if (book) {
          let response = {
            _id: book._id, title: book.book_title, comments: book.comments.map(n => n)
          }
          return res.status(200).json(response)
        }
      } catch (error) {
        return res.send('no book exists')
      }
    })

    .post(async function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if (!comment) return res.send('missing required field comment')

      try {
        let book = await Book.findById(bookid)
        if (!book) return res.send('no book exists')
        if (book) {
          book.comments.push(comment)
          const bookSaved = await book.save()
          if (!bookSaved) return res.send('no book exists')
          if (bookSaved) return res.status(200).json({ _id: bookSaved._id, title: bookSaved.book_title, comments: bookSaved.comments })
        }
      } catch (error) {
        return res.send('no book exists')
      }
    })

    .delete(async function (req, res) {
      let bookid = req.params.id;


      if (bookid === undefined || bookid === '') {
        return res.json({ error: 'id is required' });
      }

      //if successful response will be 'delete successful'
      try {
        const deletionRes = await Book.findOneAndDelete({ _id: bookid })

        if (!deletionRes) return res.send('no book exists')

        if (deletionRes) return res.status(200).send('delete successful')
      } catch (error) {
        return res.send('no book exists')
      }

    });

};
