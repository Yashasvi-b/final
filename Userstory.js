const mongoose = require("mongoose");

// Define the schema for user stories
const userStorySchema = new mongoose.Schema({
  email: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  issue: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 }, // Add the likes field
});

// Create the model
const UserStory = mongoose.model("UserStory", userStorySchema);

module.exports = UserStory;



  