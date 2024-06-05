import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !password) {
        toast.error("Email and Password are required");
        return;
      }
      const res = await axios.post(
        "http://localhost:3000/auth/register",
        formData
      );
      const { data } = res;
      if (data.error) {
        toast.error(data.error);
        return;
      } else {
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("user", JSON.stringify(data.user));
        navigate("/home");
        toast.success(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="absolute inset-0 z-0">
        <img
          src="https://source.unsplash.com/random/1920x1080"
          alt=""
          className="w-full h-full object-cover filter blur-lg brightness-50"
        />
      </div>
      <div className=" h-full flex justify-center items-center relative z-10 py-14 rounded-lg  ">
        <div className="bg-white mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
          <h1 className="text-3xl font-bold mb-8 text-center">Register</h1>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2">
                Name
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="Name"
                value={name}
                name="name"
                onChange={onChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor=""
                className="block font-semibold text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Email"
              />
            </div>
            <div className="mb-4">
              <label
                className="block font-semibold text-gray-700 mb-2"
                form="password"
              >
                Password
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-6">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
            </div>
            <div className="mb-4">
              <p className="block font-semibold text-gray-700 py-2 px-3">
                Already have an account?
                <Link
                  className="font-medium  text-blue-700 hover:underline"
                  to="/"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
