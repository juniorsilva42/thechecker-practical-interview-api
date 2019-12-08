import mongoose from 'mongoose';

const EmailModel = mongoose.model('Email', new mongoose.Schema({
  email_address: {
    type: String,
    required: true,
  },
  status: {
    enum : ['deliverable', 'deliverable-but-risk', 'undeliverable', 'unknown'],
    required: true,
    default: 'deliverable',
  },
  statusDetail: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}));

module.exports = EmailModel;