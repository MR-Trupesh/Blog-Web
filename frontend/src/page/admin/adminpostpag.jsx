import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import { FaBars } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-hot-toast";
import Edit from "../../components/edit"; // Adjust the path as needed

function AdminPostPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [post, setPost] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    try {
      const res = await axios.get("http://localhost:3000/auth/getBlog", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setPost(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Error loading posts");
    }
  };

  const handleUpdate = async (indexId, approved) => {
    try {
      await axios.put(
        `http://localhost:3000/auth/updateblog/${indexId}`,
        {
          approved,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      loadPost();
      toast.success("Updated successfully");
    } catch (err) {
      console.error("Error updating post:", err);
      toast.error("Error updating post. Please try again later.");
    }
  };

  const handleEditOpen = (post) => {
    setCurrentPost(post);
    setEditOpen(true);
  };

  const handleDelete = async (postId) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/auth/deleteblog/${postId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      loadPost();
      toast.success("Blog post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Error deleting post. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="p-2 flex justify-end">
        <button
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
        >
          <FaBars className="w-6 h-6" />
        </button>
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          className="transition-transform duration-300 ease-in-out transform-gpu"
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200 mt-4 shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="px-10 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Approved
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {post.map((index) => (
            <tr
              key={index._id}
              className="hover:bg-gray-100 transform hover:scale-105 transition-transform duration-300"
            >
              <td className="px-10  py-4 whitespace-nowrap">
                <img
                  src={`http://localhost:3000/${index.image}`}
                  alt={index.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {index.title}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  defaultValue={index.approved}
                  onChange={(e) => handleUpdate(index._id, e.target.value)}
                  className="bg-transparent border-b-2 border-black p-2 rounded font-sans font-normal text-sm cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-200"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                <button
                  onClick={() => handleEditOpen(index)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
                  disabled={loading}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editOpen && (
        <Edit
          post={currentPost}
          onCancel={() => setEditOpen(false)}
          loading={loading}
          setLoading={setLoading}
          setCurrentPost={setCurrentPost}
          setEditOpen={setEditOpen}
          className="fixed top-0 left-0 w-full h-screen bg-white shadow-md p-4 overflow-y-auto transition-transform duration-300 ease-in-out transform-gpu"
        />
      )}
    </div>
  );
}

export default AdminPostPage;
