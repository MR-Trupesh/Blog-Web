/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Blogcard({ blog }) {
  const navigate = useNavigate();
  const handleView = (item) => {
    navigate("/view", { state: { blog: item } });
    toast.success("Blog Viewed");
  };

  return (
    <div className="flex flex-wrap px-4 lg:px-10">
      {blog.map((item, index) => {
        const { title, image } = item;
        return (
          <div
            key={index}
            className="w-full md:w-1/2 lg:w-1/3 2xl:h-1/5 px-4 py-4"
          >
            <div className="bg-white p-6 rounded-lg shadow-2xl transition-transform transform hover:scale-105">
              <img
                className="w-full h-64 object-cover object-center"
                src={`http://localhost:3000/${image}`}
                alt={title}
              />
              <div className="mt-4">
                <h1 className="text-2xl font-bold">{title}</h1>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => handleView(item)}
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md transform transition-all duration-500 ease-in-out hover:bg-blue-600 hover:shadow-xl hover:scale-105 hover:border-blue-700 border-2 border-transparent"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Blogcard;
