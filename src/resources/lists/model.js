import mongoose from 'mongoose';

const ListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  emails: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Email',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const List = mongoose.model('List', ListSchema);

module.exports = List;