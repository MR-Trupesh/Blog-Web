import { Link } from "react-router-dom"; // Import Link from react-router-dom if you're using React Router
import Header from "../components/user/Header";
function Contact() {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="mb-6">Feel free to reach out to us for any inquiries!</p>
        {/* Contact Form */}
        <form className="mb-8">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            ></textarea>
          </div>
          <Link
            to="/"
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300 ease-in-out "
          >
            Back
          </Link>{" "}
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300 ease-in-out"
          >
            Send
          </button>
        </form>
        {/* Contact Details */}
        <div className="bg-gray-200 p-6 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4">Contact Details</h2>
          <p className="mb-2">Email: contact@example.com</p>
          <p className="mb-2">Phone: +1234567890</p>
          <p>Address: 123 Main Street, City, Country</p>
        </div>
      </div>
    </>
  );
}

export default Contact;
