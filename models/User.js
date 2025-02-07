const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  referralId: { type: String, unique: true },
  referralCode: { type: String , default: null},
  referralCount: { type: Number, default: 0 },
  registeredAt: { type: Date, default: Date.now },
  city: { type: String, default: null },
  companyname: { type: String, default: null },
  companylocation: { type: String, default: null },
});

module.exports = mongoose.model("User", UserSchema);
