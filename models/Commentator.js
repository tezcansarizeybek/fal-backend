const mongoose = require("mongoose");

const CommentatorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  profilePhoto: String, // Fotoğraf URL'si
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bankAccount: String,
  totalEarnings: { type: Number, default: 0 },
  salary: Number,
  rating: { type: Number, default: 0 },
  reviews: [{ falId: mongoose.Schema.Types.ObjectId, feedback: String, rating: Number }], // Yorumlar
});

module.exports = mongoose.model("Commentator", CommentatorSchema);
