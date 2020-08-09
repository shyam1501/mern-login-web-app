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

const Department = mongoose.model("departments", DepartmentSchema);

module.exports = Department
