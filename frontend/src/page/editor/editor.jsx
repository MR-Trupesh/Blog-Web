import { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { toast } from "react-hot-toast";
import axios from "axios";
import PostBlogcard from "../../components/PostBlogcard";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import Sidebar from "../../components/sidebar";

const Editor = () => {
  const [editorOpen, setEditorOpen] = useState(false);
  const [Post, setPost] = useState([]);
  const [, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    setLoading(true);
    const loadblog = async () => {
      try {
        const res = await axios.get("http://localhost:3000/auth/getblog", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setPost(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Error loading users");
      }
    };
    loadblog();
  }, []);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", file);
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/addblog",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },

          withCredentials: true,
        }
      );
      const { data } = res;
      if (data.error) {
        toast.error(data.error);
        return;
      } else {
        toast.success(data.message);
        navigate("/editor");
        setEditorOpen(false);
        setTitle("");
        setContent("");
        setFile(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while posting the blog.");
    }
  };

  return (
    <>
      <div className="p-4 flex justify-end">
        <div className="px-7 ">
          <button
            aria-controls="New Post"
            aria-expanded={editorOpen}
            onClick={() => setEditorOpen(!editorOpen)}
            className="bg-blue-500 text-white rounded-md px-3 py-3 text-sm font-medium flex items-center"
          >
            <IoAddCircle />
            Add New Post
          </button>
        </div>
        <button
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
        >
          <FaBars className="w-6 h-6" />
        </button>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
      {editorOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center">
          <div className="p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3 relative bg-white">
            <button
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
              onClick={() => setEditorOpen(!editorOpen)}
            >
              ✖
            </button>
            <h1 className="text-3xl font-bold mb-8 text-center">New Post</h1>
            <form onSubmit={handleSubmit}>
              <div className="mx-auto max-w-xs">
                <label
                  form="example1"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Upload image
                </label>
                <input
                  id="example1"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="mt-2 block w-full text-sm border rounded-md border-gray-300 py-2 px-4 text-gray-700 font-semibold focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 disabled:pointer-events-none disabled:opacity-60"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold text-gray-700 mb-2">
                  Title
                </label>
                <input
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500"
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your title"
                />
              </div>
              <div className="mb-4 ">
                <label className="block font-semibold text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500"
                  type="text"
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter your content"
                />
              </div>
              <div className="mb-6">
                <button
                  className="font-bold w-full py-2 px-4 rounded bg-teal-500 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 hover:bg-teal-600 disabled:pointer-events-none disabled:opacity-60"
                  type="submit"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div>
        <PostBlogcard Post={Post} />
      </div>
    </>
  );
};

export default Editor;
