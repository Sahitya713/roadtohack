const multer = require("multer");
const Question = require("../models/questionModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const awsManager = require("../utils/awsManager");

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

exports.manageInputFile = multer({ storage }).single("input");

exports.createQuestion = catchAsync(async (req, res, next) => {
  req.body.location = JSON.parse(req.body.location);

  if (req.body.questionType === "input") {
    try {
      const name =
        `${req.body.hackCode}` + "-" + req.body.title.split(" ").join("_");

      const inputLocation = await awsManager.uploadFile(
        req.file,
        "Input-Files",
        name
      );
      req.body.input = inputLocation.Location;

      req.body.sampleInput = JSON.parse(req.body.sampleInput);
      req.body.sampleOutput = JSON.parse(req.body.sampleOutput);
    } catch (error) {
      console.log(error);
      return next(new AppError(`a cumpulsory field is not given`, 404));
    }
  } else {
    try {
      req.body.options = JSON.parse(req.body.options);
    } catch (error) {
      return next(new AppError(`a cumpulsory field is not given`, 404));
    }
  }

  const doc = await Question.create(req.body);
  res.status(201).json({
    status: "success",
    data: doc,
  });
});
exports.getAllQuestions = factory.getAll(Question);

exports.getAllQuestionsByCode = factory.getAllByCode(Question);

// download input files
exports.getDownloadUrl = catchAsync(async (req, res) => {
  const question = await Question.findById(req.params.id);
  const fileUrl = question.input;
  //   Input-Files/53d782e3-14c5-47e8-84aa-2fb6f324f0d7.py

  const urlElems = fileUrl.split("/");
  const filename = urlElems.pop();

  const key = `Input-Files/${filename}`;

  const downloadUrl = awsManager.getDownloadUrl(key);

  res.status(200).json({
    status: "success",
    data: downloadUrl,
  });
});
