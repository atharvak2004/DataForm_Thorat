import React from 'react';
import { Link } from 'react-router-dom'; 

function Footer() {
  return (
    <>
      <div className="w-full bg-white border-t z-50 px-6 sm:px-10 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-14 text-sm">
          <div>
            <p className="text-3xl  mb-5 font-semibold">JOSHI SURVEYOR</p>
            <p className="text-gray-600">
              JOSHI SURVEYOR is a specialized vehicle inspection and valuation service provider dedicated to delivering accurate and reliable reports for financial and legal purposes. This internal portal is designed for our team to create, manage, and retrieve detailed vehicle valuation reports efficiently, ensuring consistency and quality across all inspections.
            </p>
          </div>

          <div>
            <p className="text-xl font-medium mb-5">Dive Deeper...!</p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xl font-medium mb-5">Connect With Us!</p>
            <ul className="flex flex-col gap-1 text-gray-600">
              <li>Email: piyushjoshisla@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white border-t">
        <p className="py-5 text-sm text-center text-gray-600">
          &copy; 2025 JOSHI SURVEYOR. All rights reserved.
        </p>
      </div>
    </>
  );
}

export default Footer;
