const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DepartmentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  users: [{
      type: Schema.Types.ObjectId, ref: 'User'
  }]
});

module.exports = Department = mongoose.model("departments", DepartmentSchema);
