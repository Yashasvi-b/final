// // const mongoose = require("mongoose");
// // const userSchema = new mongoose.Schema({
// //     email: { type: String, required: true, unique: true },
// //     pd: { type: String, required: true },
// //     progress: { type: Number, default: 0 }, // Add progress field
// //   });
  
// //   const User2 = mongoose.model("User2", userSchema);
  
// //   module.exports = User2;
const mongoose = require("mongoose");

const user2Schema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    tasks: { type: Map, of: { status: Boolean }, default: {} },
  },
  { collection: "user2" } // Explicitly specify the collection name
);

const User2 = mongoose.model("User2", user2Schema);

module.exports = User2;


// const mongoose = require('mongoose');

// // Define the schema for sessions (instead of 'User2')
// const sessionSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   pd: { type: String, required: true },
//   progress: { type: Number, default: 0 },
//   selfCareTasks: { type: Map, of: Boolean, default: {} },
// }, { collection: 'sessions' }); // Specify the collection name

// // Model
// const Session = mongoose.model('Session', sessionSchema);

// module.exports = Session;

