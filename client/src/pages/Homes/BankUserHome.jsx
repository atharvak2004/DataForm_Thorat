import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

function BankUserHome() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-5 pt-48">
      <h1>Welcome, Bank User</h1>
      <div className="mt-10">
        <Link to="/userreportform" className="bg-rose-700 text-white text-2xl px-6 py-3 rounded-lg shadow-md hover:bg-rose-900 transition">
          Request A Valutaion Report
        </Link>
      </div>
    </div>
  );
}

export default BankUserHome;