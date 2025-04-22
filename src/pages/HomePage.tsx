import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, Shield, Share2, Clock, CheckCircle, Send } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Simple, secure file sharing for everyone
            </h1>
            <p className="mt-3 text-xl text-gray-600 max-w-md mx-auto">
              Share files of any size with anyone, anywhere—no complicated setup required.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/signup"
                className="px-8 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 font-medium transition-colors shadow-md hover:shadow-lg"
              >
                Get Started for Free
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 rounded-md text-blue-600 bg-white border border-blue-200 hover:border-blue-300 font-medium transition-colors"
              >
                Log In
              </Link>
            </div>
          </div>
          
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/7014761/pexels-photo-7014761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="FileShare Dashboard" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              FileShare makes sharing files as easy as a few clicks
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Upload</h3>
              <p className="mt-2 text-gray-600">
                Upload any file to your secure dashboard with a simple drag and drop.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Share2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Share</h3>
              <p className="mt-2 text-gray-600">
                Get a unique link and share it with anyone, anywhere in the world.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Secure</h3>
              <p className="mt-2 text-gray-600">
                All your files are securely stored and protected with the latest encryption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">What our users say</h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-semibold text-lg">
                  JD
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">John Doe</h3>
                  <p className="text-gray-500">Freelance Designer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I use FileShare daily to send design mockups to clients. It's so much easier than email attachments and clients love the simple download experience."
              </p>
              <div className="mt-4 flex text-yellow-400">
                <CheckCircle size={20} className="fill-current" />
                <CheckCircle size={20} className="fill-current" />
                <CheckCircle size={20} className="fill-current" />
                <CheckCircle size={20} className="fill-current" />
                <CheckCircle size={20} className="fill-current" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-semibold text-lg">
                  AS
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Alice Smith</h3>
                  <p className="text-gray-500">Marketing Manager</p>
                </div>
              </div>
              <p className="text-gray-600">
                "We've eliminated so many headaches by using FileShare for our team. No more max file size limitations or complicated FTP setups."
              </p>
              <div className="mt-4 flex text-yellow-400">
                <CheckCircle size={20} className="fill-current" />
                <CheckCircle size={20} className="fill-current" />
                <CheckCircle size={20} className="fill-current" />
                <CheckCircle size={20} className="fill-current" />
                <CheckCircle size={20} className="fill-current" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-semibold text-lg">
                  RJ
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Robert Johnson</h3>
                  <p className="text-gray-500">Video Producer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I regularly share large video files with clients. FileShare made my workflow so much more efficient and professional."
              </p>
              <div className="mt-4 flex text-yellow-400">
                <CheckCircle size={20} className="fill-current" />
                <CheckCircle size={20} className="fill-current" />
                <CheckCircle size={20} className="fill-current" />
                <CheckCircle size={20} className="fill-current" />
                <CheckCircle size={20} className="fill-current" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Send size={48} className="mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl font-bold">Ready to start sharing?</h2>
          <p className="mt-4 text-xl max-w-2xl mx-auto text-blue-100">
            Join thousands of users who trust FileShare for simple, secure file sharing.
          </p>
          <div className="mt-8">
            <Link
              to="/signup"
              className="px-8 py-3 rounded-md bg-white text-blue-700 font-medium hover:bg-blue-50 transition-colors shadow-md"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;