import * as dotenv from 'dotenv' 
dotenv.config()
import { connect } from "mongoose";
const URI = process.env.MONGO_URI

const connectDB = () => {
  return connect(URI);
};

export default connectDB;
