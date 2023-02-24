const mongoose = require("mongoose");
const dbCollection = 'messageBoard'

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
      default: false
    },
    delete_password: {
      type: String,
      required: [true, "Please provide a delete password"],
    },
    replies: {
      type: Array,
      ref: 'Reply'
    }

  }, { versionKey: false, collection: dbCollection }

);

mongoose.set('strictQuery', true);
module.exports = mongoose.model("Thread", ThreadSchema);
