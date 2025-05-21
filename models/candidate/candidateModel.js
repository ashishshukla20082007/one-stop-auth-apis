const mongoose = require('mongoose');
const {JobType} = require("../../constants");

const candidateProfileSchema = new mongoose.Schema({
  user_id: {
      type: mongoose.Schema.Types.ObjectId,      
      ref: 'User',
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String
  },
  resume: {
    type: String // File path or URL
  },
  skills: {
    type: [String]
  },
  experience: {
    type: String
  },
  education: {
    type: String
  },
  projects: {
    type: [String]
  },
  jobPreferences: {
    location: {
      type: String
    },
    jobType: {
      type: String,
      enum: Object.values(JobType)
    },
    expectedSalary: {
      type: String
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('CandidateProfile', candidateProfileSchema);
