const Challenge = require("../models/challengeModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllChallenges = factory.getAll(Challenge);
exports.createChallenge = factory.createOne(Challenge);

exports.getChallenge = factory.getOne(Challenge);
// exports.getChallengeByCode = catchAsync(async (req, res, next) => {
//   let query = Challenge.findOne({ hackCode: req.params.id });
//   //   if (popOptions) query = query.populate(popOptions);
//   const doc = await query;

//   if (!doc) {
//     return next(
//       new AppError(`no document found with the ID ${req.params.id}`, 404)
//     );
//   }
//   res.status(200).json({
//     status: "success",
//     data: doc,
//   });
// });

exports.getChallengeByCode = factory.getAllByCode(Challenge);
