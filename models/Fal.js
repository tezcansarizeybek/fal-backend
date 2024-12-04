const mongoose = require("mongoose");

const FalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  commentator: { type: mongoose.Schema.Types.ObjectId, ref: "Commentator" },
  images: [String], // Fotoğraf URL'leri
  status: { type: String, enum: ["pending", "reviewed"], default: "pending" },
  comment: String, // Fal yorumu
  rating: Number, // Kullanıcı tarafından verilen puan
  userFeedback: String, // Kullanıcı yorumu
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Fal", FalSchema);
