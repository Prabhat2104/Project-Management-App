import React from 'react'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <div className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
          Manage Projects with <span className="text-blue-600">ProjectFlow</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Plan, track, and deliver your projects faster with a clean and powerful
          project management experience.
        </p>
        <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Get Started
        </button>
      </section>

      {/* Advantages Section */}
      <section className="px-6  bg-white">
        <h2 className="text-3xl font-semibold text-center text-slate-900">
          Why Choose ProjectFlow?
        </h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          
          {/* Card 1 */}
          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-slate-800">
              Clear Task Tracking
            </h3>
            <p className="mt-2 text-slate-600">
              Organize tasks with boards and timelines so everyone knows what to
              work on next.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-slate-800">
              Team Collaboration
            </h3>
            <p className="mt-2 text-slate-600">
              Collaborate with your team in real-time and keep communication
              aligned with progress.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-slate-800">
              Faster Delivery
            </h3>
            <p className="mt-2 text-slate-600">
              Stay on deadlines with smart planning and milestone tracking.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-slate-800">
              Simple & Intuitive
            </h3>
            <p className="mt-2 text-slate-600">
              A clean UI designed to reduce complexity and boost productivity.
            </p>
          </div>

          {/* Card 5 */}
          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-slate-800">
              Secure & Reliable
            </h3>
            <p className="mt-2 text-slate-600">
              Your project data is protected with modern security standards.
            </p>
          </div>

          {/* Card 6 */}
          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-slate-800">
              Scales with You
            </h3>
            <p className="mt-2 text-slate-600">
              Perfect for individuals, teams, and growing organizations.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-white px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} ProjectFlow. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:border-b">Privacy</a>
            <a href="#" className="hover:border-b">Terms</a>
            <a href="#" className="hover:border-b">Contact</a>
          </div>
        </div>
      </footer>

    </div>
    </div>
  )
}

export default Home