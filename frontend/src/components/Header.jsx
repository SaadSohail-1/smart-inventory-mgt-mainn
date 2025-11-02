import React from "react";
import { Link, useNavigate } from "react-router-dom";


function Header() {
  const navigate = useNavigate()

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold tracking-wide cursor-pointer"
        >
          Inventory<span className="text-yellow-300">Manager</span>
        </h1>

        {/* Navigation Links */}
        <nav className="space-x-6 hidden md:flex">
          <Link
            to="/"
            className="hover:text-yellow-300 transition font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/products"
            className="hover:text-yellow-300 transition font-medium"
          >
            Products
          </Link>
          <Link
            to="/"
            className="hover:text-yellow-300 transition font-medium"
          >
            Suppliers
          </Link>
          <Link
            to="/"
            className="hover:text-yellow-300 transition font-medium"
          >
            Reports
          </Link>
        </nav>

        {/* Add Product Button */}
        <button
          onClick={() => navigate("/add-product")}
          className="bg-yellow-400 text-blue-800 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition"
        >
          + Add Product
        </button>
      </div>
    </header>
  );
}

export default Header;
