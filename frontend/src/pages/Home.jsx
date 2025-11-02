import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(()=> {
      const fetchProducts = async() => {
        const res = await fetch("http://localhost:5000/api/products")
        const data = await res.json();
        setCount(data.length)
      }
      fetchProducts();
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      {/* Header Section */}
      <section className="text-center max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Welcome to <span className="text-blue-600">Inventory Manager</span>
        </h1>
        <p className="text-gray-600 mb-8">
          Keep track of your products, suppliers, and reports — all in one place.
          Streamline your workflow with a modern inventory management solution.
        </p>
        <button
          onClick={() => navigate("/add-product")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-500 transition"
        >
          + Add New Product
        </button>
      </section>

      {/* Stats Overview */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 w-full max-w-5xl">
        <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-blue-600">{count}</h2>
          <p className="text-gray-600">Total Products</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-green-600">15</h2>
          <p className="text-gray-600">Suppliers</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-yellow-500">5</h2>
          <p className="text-gray-600">Low Stock Alerts</p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="mt-16 w-full max-w-5xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <button
            onClick={() => navigate("/add-product")}
            className="bg-white shadow-md rounded-xl p-5 text-center hover:bg-blue-50 transition"
          >
            <span className="text-blue-600 text-3xl">📦</span>
            <p className="mt-2 font-medium text-gray-700">Add Product</p>
          </button>

          <button className="bg-white shadow-md rounded-xl p-5 text-center hover:bg-green-50 transition">
            <span className="text-green-600 text-3xl">📊</span>
            <p className="mt-2 font-medium text-gray-700">View Reports</p>
          </button>

          <button className="bg-white shadow-md rounded-xl p-5 text-center hover:bg-yellow-50 transition">
            <span className="text-yellow-500 text-3xl">🚨</span>
            <p className="mt-2 font-medium text-gray-700">Check Stock</p>
          </button>

          <button className="bg-white shadow-md rounded-xl p-5 text-center hover:bg-purple-50 transition">
            <span className="text-purple-600 text-3xl">👥</span>
            <p className="mt-2 font-medium text-gray-700">Manage Suppliers</p>
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
