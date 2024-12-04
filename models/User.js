const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePhoto: String, // Fotoğraf URL'si
  hobbies: [String],
  preferences: [String],
  pastRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Fal" }], // Geçmiş fal istekleri
  exampleInferences: [String],
});

module.exports = mongoose.model("User", UserSchema);
