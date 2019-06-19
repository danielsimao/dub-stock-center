const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  register_date: {
    type: Date,
    default: Date.now
  },
  favorites: {
    type: [{ currency: String, symbol: String }],
    required: false,
    maxlength: 2
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
