/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Edit from "./edit";

function PostBlogcard({ Post }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleReadMore = (index) => setExpandedIndex(index);
  const handleShowLess = () => setExpandedIndex(null);

  const handleEditOpen = (post) => {
    setCurrentPost(post);
    setEditOpen(true);
  };

  const handleDelete = async (postId) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/auth/deleteblog/${postId}`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        withCredentials: true,
      });
      toast.success("Blog post deleted successfully");
    } catch (error) {
      toast.error("Error deleting the blog post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 lg:px-10">
      {Post.map((item, index) => {
        const { _id, title, image, content, approved } = item;
        const isExpanded = expandedIndex === index;
        const truncatedContent = isExpanded
          ? content
          : `${content.slice(0, 100)}...`;

        return (
          <div
            key={_id}
            className="flex flex-col mb-6 shadow-lg rounded-lg overflow-hidden"
          >
            <div className="relative overflow-hidden">
              <img
                src={`http://localhost:3000/${image}`}
                alt={title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-75 text-white p-4">
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p className="text-gray-300">
                  {isExpanded ? content : truncatedContent}
                </p>
                {content.length > 100 && (
                  <button
                    className="text-white font-semibold mt-2 focus:outline-none hover:text-gray-400 transition duration-300"
                    onClick={() =>
                      isExpanded ? handleShowLess() : handleReadMore(index)
                    }
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                  </button>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => handleEditOpen(item)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
              >
                Edit
              </button>
              <label className="bg-green-500 rounded w-22  h-10 flex items-center  px-2">
                Status: {approved}
              </label>
              <button
                onClick={() => handleDelete(_id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
      {editOpen && (
        <Edit
          post={currentPost}
          onCancel={() => setEditOpen(false)}
          loading={loading}
          setLoading={setLoading}
          setCurrentPost={setCurrentPost}
          setEditOpen={setEditOpen}
        />
      )}
    </div>
  );
}

export default PostBlogcard;
