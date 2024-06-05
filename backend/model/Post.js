const express = require("express");
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  approved: {
    type: String,
    default: "No",
    enum: ["Yes", "No"],
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
