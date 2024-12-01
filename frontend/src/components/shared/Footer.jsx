import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Description */}
          <div className="mb-4 md:mb-0">
            <h1 className="text-xl font-bold">Job Hunt</h1>
            <p className="text-gray-400 mt-2">
              Find your dream job with us. Explore opportunities and build your future!
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <a
              href="/about"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              About Us
            </a>
            <a
              href="/jobs"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Jobs
            </a>
            <a
              href="/contact"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Contact
            </a>
            <a
              href="/faq"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              FAQ
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-6"></div>

        {/* Copyright and Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Job Hunt. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
