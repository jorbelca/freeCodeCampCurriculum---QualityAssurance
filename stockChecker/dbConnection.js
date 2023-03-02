require('dotenv').config()
const { connect } = require("mongoose");
const URI = process.env.MONGO_URI

const connectDB = () => {
  return connect(URI);
};

module.exports = connectDB;
