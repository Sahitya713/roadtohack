const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [20, "The group name must not be more than 20 characters"],
    trim: true,
  },
  image: {
    type: String,
  },
  hackCode: {
    type: String,
    required: [true, "A group must have a challenge code"],
    trim: true,
    minLength: [7, "challenge code can only be 7 characters"],
    maxLength: [7, "challenge code can only be 7 characters"],
  },
});
const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
