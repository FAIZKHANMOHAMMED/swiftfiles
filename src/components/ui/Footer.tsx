import React from 'react';
import { Send, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center">
              <Send size={20} className="text-blue-600" />
              <span className="ml-2 text-lg font-bold text-gray-900">FileShare</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Simple, secure file sharing for everyone.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <Github size={20} />
              </a>
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link to="/" className="text-sm text-gray-500 hover:text-gray-900">Features</Link>
                </li>
                <li>
                  <Link to="/" className="text-sm text-gray-500 hover:text-gray-900">Pricing</Link>
                </li>
                <li>
                  <Link to="/" className="text-sm text-gray-500 hover:text-gray-900">Security</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link to="/" className="text-sm text-gray-500 hover:text-gray-900">Help Center</Link>
                </li>
                <li>
                  <Link to="/" className="text-sm text-gray-500 hover:text-gray-900">Contact Us</Link>
                </li>
                <li>
                  <Link to="/" className="text-sm text-gray-500 hover:text-gray-900">Status</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link to="/" className="text-sm text-gray-500 hover:text-gray-900">Privacy</Link>
                </li>
                <li>
                  <Link to="/" className="text-sm text-gray-500 hover:text-gray-900">Terms</Link>
                </li>
                <li>
                  <Link to="/" className="text-sm text-gray-500 hover:text-gray-900">Cookie Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} FileShare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;