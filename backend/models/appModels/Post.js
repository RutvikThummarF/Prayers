const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    trim: true,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'Admin',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
  emojis: [
    {
      EmojiId: String,
      created: { type: Date, default: Date.now },
      createdby: { type: mongoose.Schema.ObjectId, ref: 'Admin' },
    },
  ],
  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now },
      postedBy: { type: mongoose.Schema.ObjectId, ref: 'Admin' },
      emojis: [{ type: mongoose.Schema.ObjectId, ref: 'Admin' }],
      isrepoted: { type: String, default: '0' },
      reportcomment: { type: String },
      repotcreated: { type: Date, default: Date.now },
      reportedBy: { type: mongoose.Schema.ObjectId, ref: 'Admin' },
      repotupdated: { type: Date, default: Date.now },
    },
  ],
  ispublic: { type: String, default: '1' },
  isrepoted: { type: String, default: '0' },
  reportcomment: { type: String },
  repotcreated: { type: Date, default: Date.now },
  reportedBy: { type: mongoose.Schema.ObjectId, ref: 'Admin' },
  repotupdated: { type: Date, default: Date.now },
  visiblegroups: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Group',
    },
  ],
});

module.exports = mongoose.model('Post', postSchema);
