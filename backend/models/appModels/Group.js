const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const groupSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  assignusers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Admin',
    },
  ],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'Admin',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

module.exports = mongoose.model('Group', groupSchema);
