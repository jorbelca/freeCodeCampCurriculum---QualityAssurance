const mongoose = require("mongoose");
const dbCollection = 'messageBoard-Replies'

const ReplySchema = new mongoose.Schema(
  {
    thread: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thread'
    },
    text: {
      type: String,
      required: [true, "Please provide a text"],
    },
    created_on: {
      type: Date,
      default: Date.now()
    },
    reported: {
      type: Boolean,
      default: false,
      select: false
    }
    , delete_password: {
      type: String,
      required: [true, "Please provide a delete password"],
      select: false
    },


  }, { versionKey: false, collection: dbCollection }

);

mongoose.set('strictQuery', true);
module.exports = mongoose.model("Reply", ReplySchema);
