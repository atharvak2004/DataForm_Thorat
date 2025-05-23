import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-10">
      <h1 className="text-4xl font-bold mb-8">Vehicle Valuation</h1>
      <p className="text-xl mb-4">Choose a template:</p>

      <div className="flex flex-col md:flex-row gap-6">
        <Link to="/indusindbank" className="bg-rose-700 text-white text-2xl px-6 py-3 rounded-lg shadow-md hover:bg-rose-900 transition" >
          IndusInd Bank Report
        </Link>

        <Link to="/indusindtractor" className="bg-green-600 text-white text-2xl px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition">
          IndusInd Bank Tractor Report
        </Link>

        <Link to="/equitasbank" className="bg-pink-600 text-white text-2xl px-6 py-3 rounded-lg shadow-md hover:bg-pink-700 transition">
          Equitas Bank Report
        </Link>

        <Link to="/kotakbank" className="bg-blue-600 text-white text-2xl px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
          Kotak Bank Report
        </Link>

        <Link to="/otherbank" className="bg-yellow-400 text-white text-2xl px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition">
          Other Banks Report
        </Link>
      </div>
    </div>
  );
}

export default Home;
