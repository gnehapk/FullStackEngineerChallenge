const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmployeesSchema = new Schema({
  name: String,
  email: String,
  position: String,
  department: String,
  assign: String,
});

mongoose.model('Employees', EmployeesSchema);
