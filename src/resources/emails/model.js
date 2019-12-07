import mongoose from 'mongoose';

const EmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
    required: true,
  },
  status: {
    enum : ['deliverable', 'deliverable-but-risk', 'undeliverable', 'unknown'],
    required: true,
  },
  statusDetail: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Email = mongoose.model('Email', EmailSchema);

module.exports = Email;