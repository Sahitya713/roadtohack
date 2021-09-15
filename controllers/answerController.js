const multer = require("multer");

const Question = require("../models/questionModel");
const Answer = require("../models/answerModel");
const User = require("../models/userModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const awsManager = require("../utils/awsManager");

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});
exports.manageCodeFile = multer({ storage }).single("userCode");

exports.createAnswer = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const question = await Question.findById(req.body.question);
  // const user = await User.findById(req.body.user);
  const answer = await Answer.findOne({
    question: req.body.question,
    user: req.body.user,
  });

  if (answer) {
    const ans = await Answer.findByIdAndDelete(answer._id);
  }

  if (!question) {
    return next(
      new AppError("no question associated with this answer is found")
    );
  }

  if (question.questionType == "input") {
    const name = question.title.split(" ").join("_");

    const codeLocation = await awsManager.uploadFile(
      req.file,
      "User-Code",
      name
    );
    console.log(codeLocation);
    req.body.userCode = codeLocation.Location;
    req.body.isAnswerCorrect = req.body.userAnswer == question.correctAnswer;
  } else {
    req.body.isAnswerCorrect = true;
    selectedOptions = JSON.parse(req.body.selectedOptions);
    const answers = question.options.map(({ _id, option, correct }) => {
      var answerObject = {};
      answerObject["_id"] = _id;
      answerObject["option"] = option;
      answerObject["actual"] = correct;
      const userAnswer = selectedOptions.includes(option);
      answerObject["userAnswer"] = userAnswer;
      if (correct != userAnswer) {
        req.body.isAnswerCorrect = false;
      }
      return answerObject;
    });
    req.body.userOptions = answers;
  }

  console.log(req.body);

  let doc = await Answer.create(req.body);

  doc = await doc
    .populate({
      path: "user",
      select: "group",
    })
    .execPopulate();
  res.status(201).json({
    status: "success",
    data: doc,
  });
});

exports.getAllAnswers = factory.getAll(Answer);
exports.getAllAnswersByGroup = catchAsync(async (req, res, next) => {
  let doc = await Answer.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "questions",
        localField: "question",
        foreignField: "_id",
        as: "question",
      },
    },
    { $unwind: "$user" },
    { $unwind: "$question" },
    {
      $match: {
        "user.group": req.params.groupId,
      },
    },
    {
      $project: {
        isAnswerCorrect: 1,
        userOptions: 1,
        user: { _id: 1, group: 1 },
        question: { points: 1, hackCode: 1, _id: 1, slug: 1 },
        userAnswer: 1,
        userCode: 1,
      },
    },
  ]);

  //   if (popOptions) query = query.populate(popOptions);

  res.status(200).json({
    status: "success",
    results: doc.length,
    data: doc,
  });
});
// exports.getQuestion = factory.getOne(Question);

exports.getGroupAnswers = catchAsync(async (req, res, next) => {
  // let doc = await Answer.find({ "user.group": req.params.groupId });
  // console.log(req.params.groupId);
  let doc = await Answer.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "questions",
        localField: "question",
        foreignField: "_id",
        as: "question",
      },
    },
    { $unwind: "$user" },
    { $unwind: "$question" },
    {
      $match: {
        "user.group": req.params.groupId,
        isAnswerCorrect: true,
      },
    },

    {
      $project: {
        // isAnswerCorrect: 1,
        displayName: "$user.displayName",
        userId: "$user._id",
        // user: { _id: 1, group: 1 },
        question: {
          points: 1,
          hackCode: 1,
          _id: 1,
          slug: 1,
          title: 1,
          location: 1,
        },
        // userAnswer: 1,
        // userCode: 1,
      },
    },
    {
      $group: {
        _id: "$userId",
        displayName: { $first: "$displayName" },
        totalPoints: { $sum: "$question.points" },
        questions: {
          $push: {
            title: "$question.title",
            points: "$question.points",
            location: "$question.location",
          },
        },
      },
    },
    {
      $sort: { totalPoints: -1 },
    },
  ]);

  //   if (popOptions) query = query.populate(popOptions);

  res.status(200).json({
    status: "success",
    results: doc.length,
    data: doc,
  });
});

exports.getLeaderBoard = catchAsync(async (req, res, next) => {
  // let doc = await Answer.find({ "user.group": req.params.groupId });
  // console.log(req.params.groupId);
  let doc = await Answer.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "questions",
        localField: "question",
        foreignField: "_id",
        as: "question",
      },
    },
    { $unwind: "$user" },
    { $unwind: "$question" },
    {
      $match: {
        isAnswerCorrect: true,
      },
    },
    {
      $project: {
        groupObj: { $toObjectId: "$user.group" },
        question: {
          title: 1,
          points: 1,
        },
      },
    },
    {
      $lookup: {
        from: "groups",
        localField: "groupObj",
        foreignField: "_id",
        as: "group",
      },
    },
    { $unwind: "$group" },
    {
      $match: {
        "group.hackCode": req.params.hackCode,
      },
    },
    {
      $group: {
        _id: "$groupObj",
        group: { $first: "$group" },
        totalPoints: { $sum: "$question.points" },
      },
    },
    {
      $sort: { totalPoints: -1 },
    },
  ]);

  res.status(200).json({
    status: "success",
    results: doc.length,
    data: doc,
  });
});
