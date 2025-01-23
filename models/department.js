const mongoose = require('mongoose');

// Create a schema for departments
const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  dailyQuota: {type: Number, required: true},
  image: {
    type: {
      filename: String,
      originalName: String,
      mimeType: String,
      path: String,
      size: Number,
      uploadDate: { type: Date, default: Date.now },
    },
    default: null, 
  },
});

// Export the model
module.exports = mongoose.model('Department', departmentSchema);
