const multer = require("multer");

const Group = require("../models/groupModel");
const factory = require("./handlerFactory");

const awsManager = require("../utils/awsManager");
const catchAsync = require("../utils/catchAsync");

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

exports.manageGrpImage = multer({ storage }).single("image");
// const catchAsync = require("../utils/catchAsync");
// const AppError = require("../utils/appError");

exports.createGroup = catchAsync(async (req, res) => {
  const imageLocation = await awsManager.uploadFile(req.file, "Group-Image");
  req.body.image = imageLocation.Location;

  const doc = await Group.create(req.body);
  res.status(201).json({
    status: "success",
    data: doc,
  });
});

exports.getAllGroups = factory.getAll(Group);
// exports.createGroup = factory.createOne(Group);

// exports.updateGroup = factory.updateOne(Group);

exports.updateGroup = catchAsync(async (req, res, next) => {
  if (req.file) {
    const imageLocation = await awsManager.uploadFile(req.file, "Group-Image");
    req.body.image = imageLocation.Location;
  }

  const group = await Group.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!group) {
    return next(
      new AppError(`no document found with the ID ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: group,
  });
});

exports.getGroup = factory.getOne(Group);

exports.getAllGroupsByCode = factory.getAllByCode(Group);
