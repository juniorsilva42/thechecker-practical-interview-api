import mongoose from 'mongoose';

const ListModel = mongoose.model('Lists', new mongoose.Schema({
  name: {
    type: String,
  },
  mailchimpListId: {
    type: String,
    unique: true,
  },
  emails: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Emails',
  }],
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}));

module.exports = ListModel;