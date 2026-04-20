import React, { useEffect, useState } from "react";

export default function HomePage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const mockCourses = [
      {
        id: 1,
        title: "Learn React for Free",
        instructor: "John Doe",
        level: "Beginner"
      },
      {
        id: 2,
        title: "JavaScript Mastery",
        instructor: "Jane Smith",
        level: "Intermediate"
      },
      {
        id: 3,
        title: "Full Stack Development",
        instructor: "Alex Johnson",
        level: "Advanced"
      }
    ];

    setCourses(mockCourses);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {/* Navbar */}
      <nav className="bg-gray-900 border-b border-gray-800 px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">LearnHub</h1>

        <div className="flex gap-6 items-center">
          <a href="/courses" className="font-medium hover:text-white text-gray-400">
            Browse Courses
          </a>

          <a href="/teach" className="font-medium hover:text-white text-gray-400">
            Teach
          </a>

          <a
            href="/login"
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
          >
            Login
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-8 py-20 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 text-white">
            Learn to code interactively
          </h2>

          <p className="text-gray-400 mb-8 text-lg">
            Learn programming with interactive coding challenges and projects
          </p>

          <a
            href="/courses"
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Browse Courses
          </a>
        </div>
      </section>

      {/* Courses */}
      <section className="px-8 py-16 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold mb-10 text-white">
            Popular Courses
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.length > 0 &&
              courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:border-gray-700 transition"
                >
                  <h4 className="text-xl font-semibold mb-2 text-white">
                    {course.title}
                  </h4>

                  <p className="text-gray-400 mb-2">
                    Instructor: {course.instructor}
                  </p>

                  <p className="text-sm text-gray-500 mb-4">
                    {course.level}
                  </p>

                  <a
                    href={`/course/${course.id}`}
                    className="text-white font-medium hover:underline"
                  >
                    Start Learning →
                  </a>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-8 py-16 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold mb-10 text-white">
            Categories
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Frontend", "Backend", "DevOps", "Machine Learning"].map(
              (category) => (
                <div
                  key={category}
                  className="bg-gray-800 border border-gray-700 p-6 rounded-2xl text-center hover:bg-gray-700 transition"
                >
                  <h4 className="font-semibold text-white">{category}</h4>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 px-8 py-12 mt-16 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex justify-between flex-wrap gap-8">
          <div>
            <h4 className="font-bold mb-2 text-white">LearnHub</h4>
            <p>Learn interactively</p>
          </div>

          <div className="flex gap-12">
            <div>
              <h5 className="font-semibold mb-2 text-white">Courses</h5>
              <p>Frontend</p>
              <p>Backend</p>
            </div>

            <div>
              <h5 className="font-semibold mb-2 text-white">Company</h5>
              <p>About</p>
              <p>Contact</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
