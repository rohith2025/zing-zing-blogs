import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Footer from "./footer";
import NavbarSignedup from "./navbarsignedup.tsx";
import usersData from "../data/two.ts";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Blog {
  id: string;
  title: string;
  author: string;
  date: string;
  summary: string;
}

const currentUser = localStorage.getItem("userID");
console.log(currentUser)

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/blog/all")
      .then((res) => {
        const blogsFromBackend = res.data.map((blog: any) => ({
          id: blog.blogid?.toString() || blog._id?.toString(),
          title: blog.title,
          author: blog.author || `User #${blog.userid}`,
          date: blog.date,
          summary: blog.content.slice(0, 200) + "...",
        }));
        setBlogs(blogsFromBackend);
      })
      .catch((err) => {
        console.error("Axios error:", err);
        setError("Failed to load blogs.");
      });
  }, []);

  return (
    <>
      <NavbarSignedup user={currentUser} />
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen flex flex-col justify-between">
        <section className="max-w-6xl mx-auto px-6 py-16 space-y-10">
          <h1 className="text-3xl font-bold text-indigo-700 mb-8">Latest Blogs</h1>

          {error && <p className="text-red-500">{error}</p>}

          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col justify-between h-[300px] overflow-hidden"
              >
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold text-indigo-600 mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-700 text-sm mb-4">
                    <span className="font-medium">by {blog.author}</span> ·{" "}
                    {blog.date}
                  </p>
                  <p className="text-gray-700 line-clamp-2">{blog.summary}</p>
                </div>
                <Link
                  to={`/blog/${blog.id}`}
                  className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition self-start"
                >
                  Read More
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No blogs available.</p>
          )}
        </section>
        <Footer />
      </div>
    </>
  );
}
