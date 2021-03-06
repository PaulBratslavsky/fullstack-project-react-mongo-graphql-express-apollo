const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = mongoose.Schema({

  title: {
    required: true,
    type: String,
    maxlength: 100,
  },

  excerpt: {
    required: true,
    type: String,
    maxlength: 1000,
  },

  content: {
    required: true,
    type: String,
    maxlength: 10000,
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  status: {
    type: String,
    enum: ["DRAFT", "PUBLISHED"],
    default: "DRAFT",
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  }
  
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = { Post };
