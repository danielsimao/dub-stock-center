const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  eventType: { type: String, require: true },
  timestamp: { type: Date, default: Date.now },
  user: { type: ObjectId, require: true },
  action: { type: Object, require: true }
});

module.exports = Event = mongoose.model("event", EventSchema);
