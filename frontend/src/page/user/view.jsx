/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import Header from "../../components/user/Header";
function View() {
  const location = useLocation();
  const { blog } = location.state || {};

  if (!blog) {
    return (
      <div className="container mx-auto px-4 lg:px-10 py-6">
        Blog post not found.
      </div>
    );
  }
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="bg-gray-100 dark:bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className=" flex items-center p-1 w-10 h-10 bg-blue-500 text-white font-semibold rounded-lg shadow-md transform transition-all duration-500 ease-in-out hover:bg-blue-600 hover:shadow-xl hover:scale-105 hover:border-blue-700 border-2 border-transparent">
              <Link to="/">
                <IoArrowBackOutline size={25} />
              </Link>
            </div>
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={`http://localhost:3000/${blog.image}`}
                  alt="Product Image"
                />
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-9">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-black mb-2">
              {blog.title}
            </h2>
            <div>
              <p className="text-gray-600 dark:text-black text-sm mt-2">
                {blog.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default View;
