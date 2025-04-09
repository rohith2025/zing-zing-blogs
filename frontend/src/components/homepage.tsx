import { useEffect, useState } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import { hotTopics } from "../data/hottopics";
import { creators } from "../data/creators";



export default function HomePage() {
  const authors = [
    {
      name: "Alice Johnson",
      bio: "Frontend Dev & UI/UX wizard ✨",
    },
    {
      name: "Mark Tran",
      bio: "Backend ninja and DevOps geek 💻",
    },
    {
      name: "Sara Lopez",
      bio: "Full-stack storyteller with a love for clean code 🌈",
    },
  ];

  return (
    <>
      <Navbar></Navbar>
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen">
        <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to ZingZing Blog
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Discover the new blogs by <strong>Backend Bd Bhai 🚬</strong>
          </p>
          {/* <button className="mt-6 px-6 py-2 bg-white text-indigo-600 font-semibold rounded-full hover:bg-gray-100 transition">
            Start Reading
          </button> */}
        </section>

        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-semibold mb-8 text-gray-800 text-center">
            Hot Topics
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {hotTopics.map((blog, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow"
              >
                <h3 className="text-2xl font-bold text-indigo-600 mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-700">{blog.excerpt}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-gray-100 to-gray-50 py-16">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
            Featured Creators
          </h2>
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
            {creators.map((author, index) => (
              <div
                key={index}
                className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="text-xl font-semibold text-indigo-600 mb-2">
                  {author.name}
                </div>
                <p className="text-gray-700 text-sm">{author.bio}</p>
              </div>
            ))}
          </div>
        </section>
        <Footer></Footer>
      </div>
    </>
  );
}
