import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-hot-toast";
import Sidebar from "../../components/sidebar";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/auth/getuser", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setUser(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Error loading users");
      }
    };
    loadUsers();
  }, []);

  const handleDelete = async (indexId) => {
    try {
      await axios.delete(`http://localhost:3000/auth/delete/${indexId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setUser(user.filter((user) => user._id !== indexId));
      toast.success("User deleted successfully");
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Error deleting user");
    }
  };

  const handleUpdate = async (userId, role) => {
    try {
      await axios.put(
        `http://localhost:3000/auth/update/${userId}`,
        { role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success("User role updated successfully");
    } catch (err) {
      console.error("Error updating user:", err);
      toast.error("Error updating user");
    }
  };

  return (
    <div className="font-sans ">
      <div className="p-2 flex justify-end">
        <button
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
        >
          <FaBars className="w-6 h-6" />
        </button>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
      <table className="min-w-full table-auto shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="px-10 text-left text-xs uppercase font-mono font-bold border-b-2 border-gray-900 ">
              Name
            </th>
            <th className="p-3 text-left text-xs uppercase font-mono font-bold border-b-2 border-gray-900">
              Email
            </th>
            <th className="p-3 text-left text-xs uppercase font-mono font-bold border-b-2 border-gray-900">
              Role
            </th>
            <th className="p-3 text-left text-xs uppercase font-mono font-bold border-b-2 border-gray-900">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {user.map((index) => (
            <tr
              key={index._id}
              className="hover:bg-gray-100 transform hover:scale-105 transition-transform duration-300 "
            >
              <td className="px-10 whitespace-nowrap">{index.name}</td>
              <td className="p-3 whitespace-nowrap">{index.email}</td>
              <td className="p-3 whitespace-nowrap">
                <select
                  defaultValue={index.role}
                  onChange={(e) => handleUpdate(index._id, e.target.value)}
                  className="bg-transparent border-b-2 border-black p-2 rounded font-sans font-normal text-sm cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-200"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                </select>
              </td>
              <td className="p-3 whitespace-nowrap">
                <button
                  onClick={() => handleDelete(index._id)}
                  className="bg-red-500 text-white py-1 px-2 rounded cursor-pointer font-sans font-medium text-sm transition-transform duration-300 ease-in-out transform hover:scale-110 hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
