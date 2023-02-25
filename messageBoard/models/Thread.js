const mongoose = require("mongoose");
const dbCollection = 'messageBoard-Threads'

const ThreadSchema = new mongoose.Schema(
  {
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
      default: false,
      select: false
    },
    delete_password: {
      type: String,
      required: [true, "Please provide a delete password"],
      select: false
    },
    replies: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reply'
    }]

  }, { versionKey: false, collection: dbCollection }

);

mongoose.set('strictQuery', true);
module.exports = mongoose.model("Thread", ThreadSchema);
