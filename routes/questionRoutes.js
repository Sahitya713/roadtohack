const express = require("express");
const questionController = require("../controllers/questionController");
const router = express.Router();

router
  .route("/")
  .post(questionController.manageInputFile, questionController.createQuestion);
router
  .route("/get-questions/:hackCode")
  .get(questionController.getAllQuestionsByCode);

router.get("/download/:id", questionController.getDownloadUrl);
// router.route("/:id").get(userController.getChallengeByCode);
module.exports = router;
