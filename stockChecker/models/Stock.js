import mongoose from "mongoose"
const dbCollection = 'stockChecker'

const StockSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: [true, "Please provide a title"],
      maxlength: 30
    },
    likes: {
      type: [String]
    }

  }, { versionKey: false, collection: dbCollection }

);

mongoose.set('strictQuery', true);
export default mongoose.model("Stock", StockSchema);
