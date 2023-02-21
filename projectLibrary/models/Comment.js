const mongoose = require("mongoose");
const dbCollection = 'personalLibrary-Comments'

const CommentSchema = new mongoose.Schema(
  {

    book_id: {
      type: ObjectId,
      ref: 'Book'
    },
    comments: {
      type: [String]
    }

  }, { versionKey: true, collection: dbCollection }

);

mongoose.set('strictQuery', true)
module.exports = mongoose.model("Comment", CommentSchema);
