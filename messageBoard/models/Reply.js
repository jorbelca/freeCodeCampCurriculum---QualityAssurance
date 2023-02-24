const mongoose = require("mongoose");
const dbCollection = 'messageBoard'

const ReplySchema = new mongoose.Schema(
  {
    thread_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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
    bumped_on: {
      type: Date,
      default: Date.now()
    },
    reported: {
      type: Boolean,
      default: false
    }
    , delete_password: {
      type: String,
      required: [true, "Please provide a delete password"],
    },


  }, { versionKey: false, collection: dbCollection }

);

mongoose.set('strictQuery', true);
module.exports = mongoose.model("Reply", ReplySchema);
