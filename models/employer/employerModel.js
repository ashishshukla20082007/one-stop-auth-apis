const mongoose = require('mongoose');

const employerProfileSchema = new mongoose.Schema({
  user_id: {
      type: mongoose.Schema.Types.ObjectId,      
      ref: 'User',
  },
  companyName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contactPerson: {
    type: String,  
  },
  phone: {
    type: String
  },
  industry: {
    type: String
  },
  companyDescription: {
    type: String
  },
  website: {
    type: String
  },
  postedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'  // Assuming you have a Job model
  }]
}, { timestamps: true });

module.exports = mongoose.model('EmployerProfile', employerProfileSchema);
