import mongoose from 'mongoose';

const ListModel = mongoose.model('List', new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}));

module.exports = ListModel;