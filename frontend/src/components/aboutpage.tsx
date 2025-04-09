import Footer from "./footer";
import Navbar from "./navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen">
        <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About ZingZing Blog
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            The voice of passionate developers, designers, and dreamers —
            curated for you by <strong>Backend Bd Bhai 🚬</strong>
          </p>
        </section>

        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-indigo-600 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700 text-lg">
                At ZingZing Blog, we're committed to delivering high-quality,
                insightful, and entertaining tech content that fuels your
                curiosity and keeps you ahead in the fast-paced world of
                development.
              </p>
              <p className="text-gray-700 mt-4">
                Whether you're a coding ninja or just starting out, our content
                is crafted to inspire, educate, and empower you.
              </p>
            </div>
            <div>
              <img
                src="https://i.ibb.co/Wv6yV4qs/Chat-GPT-Image-Apr-9-2025-08-36-53-PM.png"
                alt="Team working"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-gray-100 to-gray-50  py-16">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
            Why ZingZing?
          </h2>
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
            <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                Curated Content
              </h3>
              <p className="text-gray-700 text-sm">
                Every post is carefully crafted and reviewed to ensure quality,
                accuracy, and value.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                Real Devs, Real Stories
              </h3>
              <p className="text-gray-700 text-sm">
                Content written by developers who live and breathe code — not
                bots or clickbait.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                Community First
              </h3>
              <p className="text-gray-700 text-sm">
                We believe in empowering the tech community with knowledge,
                mentorship, and collaboration.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
