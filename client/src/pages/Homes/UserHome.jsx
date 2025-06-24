import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

function UserHome() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-blue-50 p-5 pt-48">
      <h1>Welcome, User</h1>
      <div className="mt-10">
        <Link to="/userreportform" className="bg-blue-600 text-white text-2xl px-6 py-3 rounded-lg shadow-md hover:bg-blue-800 transition">
          Request A Valutaion Report
        </Link>
      </div>
    </div>
  );
}

export default UserHome; 