import mongoose from 'mongoose';

const EmailModel = mongoose.model('Emails', new mongoose.Schema({
  email_address: {
    type: String,
    unique: true,
  },
  status: {
    type: String,
    default: 'not_verified',
  },
  statusDetail: {
    type: String,
    default: '',
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lists',
  },
  createdAt: {
    type: Date,  
    default: Date.now,
  }
}));

module.exports = EmailModel;