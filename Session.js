// const mongoose = require('mongoose');

// // Define the schema for sessions
// const sessionSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   pd: { type: String, required: true },
//   progress: { type: Number, default: 0 },
//   selfCareTasks: { type: Map, of: Boolean, default: {} },
// }, { collection: 'sessions' });

// // Use `mongoose.models` to check if the model already exists
// const Session = mongoose.models.Session || mongoose.model('Session', sessionSchema);

// module.exports = Session;

const mongoose = require('mongoose');

// Define the schema for sessions
const sessionSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Primary identifier
  selfCareTasks: { type: Map, of: Boolean, default: {} }, // Tracks self-care activities
}, { collection: 'sessions' });

// Use `mongoose.models` to avoid model recompilation error
const Session = mongoose.models.Session || mongoose.model('Session', sessionSchema);

module.exports = Session;
