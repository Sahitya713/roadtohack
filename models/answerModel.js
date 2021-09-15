const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
  // hackCode: {
  //   type: String,
  //   required: [true, "A challenge must have a challenge code"],
  //   trim: true,
  //   minLength: [7, "challenge code can only be 7 characters"],
  //   maxLength: [7, "challenge code can only be 7 characters"],
  // },
  question: {
    type: mongoose.Schema.ObjectId,
    ref: "Question",
    required: [true, "An answer must belong to a question"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "An answer must be submitted by a user"],
  },
  isAnswerCorrect: {
    type: Boolean,
    default: false,
  },
  userAnswer: String,
  userCode: String,
  userOptions: [
    {
      _id: String,
      option: String,
      actual: Boolean,
      userAnswer: Boolean,
    },
    { _id: false },
  ],
});

answerSchema.index(
  { user: 1, question: 1 },
  { unique: [true, "A user can only answer a question once"] }
);
answerSchema.pre(/^find/, function (next) {
  this.populate({
    path: "question",
    select: "hackCode points slug",
  }).populate({
    path: "user",
    select: "group",
  });
  next();
});

const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;
