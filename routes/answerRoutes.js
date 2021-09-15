const express = require("express");
const answerController = require("../controllers/answerController");
const router = express.Router();

router
  .route("/")
  .post(answerController.manageCodeFile, answerController.createAnswer)
  .get(answerController.getAllAnswers);

router
  .route("/get-group-answers/:groupId")
  .get(answerController.getAllAnswersByGroup);

router
  .route("/get-group-scores/:groupId")
  .get(answerController.getGroupAnswers);

router.route("/get-leaderboard/:hackCode").get(answerController.getLeaderBoard);
module.exports = router;
