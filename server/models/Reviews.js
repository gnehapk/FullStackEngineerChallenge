const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewsSchema = new Schema({
  employeeId: String,
  content: String,
  updateBy: String,
  createBy: String,
});

mongoose.model('Reviews', ReviewsSchema);
