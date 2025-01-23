const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },  
  description: String,
  date: { type: Date, required: true },  
  // time: { type: String, enum: ['morning', 'afternoon'], required: true },  
  status: { type: String, enum: ['upcoming', 'completed', 'cancelled'], default: 'upcoming' },  
  firstname: String,  
  lastname: String,   
  age: Number,
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  dateOfBirth: Date,
  address: String,
  mobileNumber: String,
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
