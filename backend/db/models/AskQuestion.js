import mongoose from "mongoose";

const AskQuestionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  comments: [{ comment: String, date: { type: Date, default: Date.now } }],
});

const AskQuestionModel = new mongoose.model("Ask Question", AskQuestionSchema);

export default AskQuestionModel;
