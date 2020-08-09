const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Department = require('./Department')

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department'
  }
});

const User = mongoose.model("users", UserSchema);

module.exports = User
