const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  commentText: { type: String, required: true },
  commentDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
