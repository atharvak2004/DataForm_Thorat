import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-10">
      <h1 className="text-4xl font-bold mb-8">Vehicle Report Generator</h1>
      <p className="text-xl mb-4">Choose a template to get started:</p>

      <div className="flex flex-col md:flex-row gap-6">
        <Link to="/indusind" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition" >
          IndusInd Bank Report
        </Link>

        <Link to="/indusindtractor" className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition">
          IndusInd Bank Tractor Report
        </Link>
      </div>
    </div>
  );
}

export default Home;
