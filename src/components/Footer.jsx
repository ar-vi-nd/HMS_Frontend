import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Your Company</h3>
          <p className="text-gray-600 mt-4">
            We are committed to providing the best service in the industry. Stay connected for updates.
          </p>
        </div>
        
        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Quick Links</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-600 hover:text-blue-600">About</Link>
            </li>
            <li>
              <Link to="/services" className="text-gray-600 hover:text-blue-600">Services</Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Follow Us</h3>
          <div className="mt-4 flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <svg
                className="w-6 h-6 text-gray-600 hover:text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22.675 0h-21.35C.595 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.324 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.787 4.662-4.787 1.325 0 2.462.099 2.794.143v3.24h-1.917c-1.504 0-1.796.716-1.796 1.763v2.31h3.592l-.468 3.622h-3.124V24h6.116c.73 0 1.324-.593 1.324-1.324V1.324C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <svg
                className="w-6 h-6 text-gray-600 hover:text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.196 4.916 4.916 0 00-8.384 4.482A13.944 13.944 0 011.671 3.149a4.916 4.916 0 001.523 6.556A4.902 4.902 0 01.964 9.03v.063a4.917 4.917 0 003.946 4.827 4.902 4.902 0 01-2.21.084 4.916 4.916 0 004.588 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.213c9.056 0 14.007-7.504 14.007-14.007 0-.213-.005-.426-.014-.637A10.012 10.012 0 0024 4.557z" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <svg
                className="w-6 h-6 text-gray-600 hover:text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19.664 3.315C22.404 3.315 24 4.938 24 7.728v12.546C24 23.072 22.404 24 19.664 24H4.338C1.596 24 0 23.072 0 20.273V7.728C0 4.938 1.596 3.315 4.338 3.315h15.326zm-9.28 16.455v-8.671H7.345v8.671h3.037zm-1.516-9.92c1.06 0 1.727-.76 1.727-1.71-.02-.973-.667-1.71-1.707-1.71-1.04 0-1.727.737-1.727 1.71 0 .951.668 1.71 1.687 1.71h.02zm10.08 9.92v-4.855c0-.261-.02-.522-.098-.71-.215-.522-.707-.828-1.333-.828-.727 0-1.153.394-1.365.828-.098.2-.119.451-.119.71v4.855h3.035zm-9.035 0v-8.671H9.54v8.671h3.036zm9.035 0v-4.855c0-.955-.035-1.71-.568-2.193-.497-.441-1.277-.622-1.972-.622-.862 0-1.547.41-1.852.828-.107.178-.178.42-.178.671v6.171h-3.036v-8.671h3.036v1.095c.419-.638 1.178-1.276 2.6-1.276 1.821 0 3.182 1.212 3.182 3.804v5.048h-3.032z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center py-4 bg-gray-100 text-gray-600">
        &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
