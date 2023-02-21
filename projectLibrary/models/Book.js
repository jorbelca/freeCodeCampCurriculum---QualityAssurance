const mongoose = require("mongoose");
const dbCollection = 'personalLibrary-Books'

const BookSchema = new mongoose.Schema(
  {
    book_title: {
      type: String,
      required: [true, "Please provide a title"],
      maxlength: 30
    },
    comments: {
      type: [String],
      ref: 'Comment'
    }

  }, { versionKey: false, collection: dbCollection }

);

mongoose.set('strictQuery', true)
module.exports = mongoose.model("Book", BookSchema);
