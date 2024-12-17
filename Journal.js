// const mongoose = require('mongoose');

// const JournalSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   journalType: { type: String, required: true },
//   entries: [
//     {
//       title: { type: String, required: true },
//       content: { type: Map, of: String, required: true }, // Storing prompts and responses
//       date: { type: String, required: true },
//     },
//   ],
// });

// module.exports = mongoose.model('Journal', JournalSchema);
const mongoose = require("mongoose");

const journalEntrySchema = new mongoose.Schema({
  journalType: {
    type: String,
    enum: ["morning", "daily", "weekly", "gratitude"],
    required: true,
  },
  title: String,
  content: mongoose.Schema.Types.Mixed, // Supports various content types
  date: { type: Date, default: Date.now },
});

const journalSchema = new mongoose.Schema({
  email: { type: String, required: true },
  entries: [journalEntrySchema],
});

const JournalModel = mongoose.model("Journal", journalSchema);

module.exports = JournalModel;
