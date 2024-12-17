

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   pd: {
//     type: String,
//     required: true,
//   },
// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    pd: {
      type: String,
      required: true,
    },
  },
  { collection: "users" } // Explicitly specify the collection name
);

const User = mongoose.model("User", userSchema);

module.exports = User;
