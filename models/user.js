const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  register_date: {
    type: Date,
    default: Date.now
  },
  favorites: {
    type: [{ currency: String, stock: String }],
    required: false,
    maxlength: 4
  }
});

module.exports = User = mongoose.model("user", UserSchema);
