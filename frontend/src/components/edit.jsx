/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function edit({
  onCancel,
  loading,
  setLoading,
  post,
  setCurrentPost,
  setEditOpen,
}) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setImage(post.image);
    }
  }, [post]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      }

      await axios.put(
        `http://localhost:3000/auth/updateblog/${post._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },

          withCredentials: true,
        }
      );

      // Update the post with new values
      setCurrentPost({
        ...post,
        title,
        content,
        image,
      });
      setEditOpen(false);
      toast.success("Updated successfully");
    } catch (err) {
      console.error("Error updating post:", err);
      toast.error("Error updating post. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center">
      <div className="p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3 relative bg-white">
        <button
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
          onClick={onCancel}
        >
          ✖
        </button>
        <h1 className="text-3xl font-bold mb-8 text-center">Edit Post</h1>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Upload image
            </label>
            <input
              type="file"
              className="mt-2 block w-full text-sm border rounded-md border-gray-300 py-2 px-4 text-gray-700 font-semibold focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 disabled:pointer-events-none disabled:opacity-60"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500"
              type="text"
              placeholder="Enter your title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Content
            </label>
            <textarea
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <button
              className="font-bold w-full py-2 px-4 rounded bg-teal-500 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 hover:bg-teal-600 disabled:pointer-events-none disabled:opacity-60"
              type="submit"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default edit;
