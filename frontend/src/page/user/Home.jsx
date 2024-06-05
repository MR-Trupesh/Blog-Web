import { useEffect, useState } from "react";
import Header from "../../components/user/Header";
import Blogcard from "../../components/user/Blogcard";

function Home() {
  const [blog, setBlog] = useState([]);
  const [, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/auth/getblog")
      .then((res) => res.json())
      .then((data) => {
        const approvedBlogPosts = data.filter(
          (post) => post.approved === "Yes"
        ); // Adjusted condition
        setBlog(approvedBlogPosts);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Header />
      <div>
        <Blogcard blog={blog} />
      </div>
    </div>
  );
}

export default Home;
