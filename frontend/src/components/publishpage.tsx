import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PublishPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userID");

    if (!token || !userId) {
      alert("You must be logged in to publish a blog.");
      navigate("/login");
    }
  }, [navigate]);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userID");

    if (!token || !userId) {
      alert("Login required to publish");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/v1/blog/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          title,
          content,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Blog published successfully!");
        navigate("/blogs");
      } else {
        alert(data.message || "Publishing failed");
      }
    } catch (err) {
      alert("Error connecting to server");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
          Publish a New Blog
        </h1>
        <form onSubmit={handlePublish} className="space-y-6">
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Blog Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>
          {/* <div>
            <label className="block font-medium text-gray-700 mb-1">
              Summary
            </label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-20 resize-none focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div> */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-40 resize-none focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
}
