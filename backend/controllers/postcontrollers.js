const express = require("express");
const Post = require("../model/Post");

const addblog = async (req, res) => {
  const { title, content } = req.body;
  try {
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Please provide title and content" });
    }

    if (!req.file || !req.file.filename) {
      return res.status(400).json({ message: "Please provide an image file" });
    }

    const newPost = new Post({
      title,
      content,
      image: req.file.filename,
    });

    await newPost.save();
    res.status(201).json({ message: "Post added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatedblog = async (req, res) => {
  const { id } = req.params;
  const { title, content, approved, image } = req.body;

  try {
    if (title) {
      const existingPost = await Post.findOne({ title, _id: { $ne: id } });
      if (existingPost) {
        return res
          .status(400)
          .json({ message: "Post with this title already exists" });
      }
    }

    const updatedFields = {};
    if (title) updatedFields.title = title;
    if (content) updatedFields.content = content;
    if (approved !== undefined) updatedFields.approved = approved;
    if (req.file && req.file.filename) updatedFields.image = req.file.filename;
    console.log(updatedFields);
    console.log(updatedFields.image);

    const updatedPost = await Post.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    await updatedPost.save();

    res.json({ message: "Updated successfully", post: updatedPost });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteblog = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBlog = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addblog, getBlog, updatedblog, deleteblog };
