import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../utils/auth";

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token");
      }
    }
  }, []);

  return (
    <div>
      {user && (
        <div className=" bg-blue-50 text-left p-4 text-sm text-gray-700">
          Hello, {user.email}
        </div>
      )}

      <div className="flex flex-col items-center  min-h-screen bg-blue-50 p-5 pt-48">
        <h1 className="text-4xl font-bold mb-4">Vehicle Valuation</h1>
        <p className="text-xl mb-10">Choose a template:</p>

        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6">
          <Link to="/indusindbank" className="bg-rose-700 text-white text-2xl px-6 py-3 rounded-lg shadow-md hover:bg-rose-900 transition">
            IndusInd Bank Report
          </Link>

          <Link to="/indusindtractor" className="bg-green-600 text-white text-2xl px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition">
            IndusInd Tractor Report
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
    </div>
  );
}

export default Home;
