const User = require("../models/userModel");
const Challenge = require("../models/challengeModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// exports.getUser = factory.getOne(User);
// exports.createUser = factory.createOne(User);

// exports.validateUser = catchAsync(async (req, res, next) => {

// });
exports.getUser = catchAsync(async (req, res, next) => {
  console.log("get user function called");
  const doc = await User.findOne({ uid: req.params.id });

  if (!doc) {
    return next(new AppError(`User does not exist`, 404));
  }

  res.status(201).json({
    status: "success",
    data: doc,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const challenge = await Challenge.find({ hackCode: req.body.hackCode });

  if (!challenge) {
    return next(
      new AppError(`The challenge code ${req.params.hackCode} is invalid`, 404)
    );
  }
  const doc = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: doc,
  });
});
