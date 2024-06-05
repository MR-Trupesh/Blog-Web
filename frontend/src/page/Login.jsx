import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (role) {
      switch (role) {
        case "user":
          navigate("/home");
          break;
        case "admin":
          navigate("/admin");
          break;
        case "editor":
          navigate("/editor");
          break;
        default:
          break;
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const { role, message } = response.data;
      sessionStorage.setItem("isAuthenticated", "true");
      sessionStorage.setItem("role", role);

      switch (role) {
        case "user":
          navigate("/home");
          break;
        case "admin":
          navigate("/admin");
          break;
        case "editor":
          navigate("/editor");
          break;
        default:
          console.error("Unknown role in response");
          break;
      }

      toast.success(message);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/1920/1080"
          alt=""
          className="w-full h-full object-cover filter blur-lg brightness-50"
        />
      </div>
      <div className="h-full flex justify-center items-center relative z-10 py-14 rounded-lg">
        <div className="bg-white mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
          <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block font-semibold text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="mb-6">
              <button
                className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              {error && (
                <p className="text-red-600 mt-4" aria-live="assertive">
                  {error}
                </p>
              )}
            </div>
            <div className="mb-4">
              <p className="block font-semibold text-gray-700 py-2 px-3">
                Dont have an account?
                <Link
                  className="font-medium text-blue-700 hover:underline"
                  to="/register"
                >
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
