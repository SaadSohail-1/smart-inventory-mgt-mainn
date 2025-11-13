import { useEffect, useState } from 'react';
import React from 'react'
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import { bubbleSort } from '../utils/Sort';

function Products() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();

  const getProducts = async() =>{
    try{
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      alert("Error fetching data");
      console.log(err);
    }
  }

  const searchProduct = async(e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return getProducts(); // show all if empty
    try {
      const res = await fetch(`http://localhost:5000/api/products/search/${searchQuery}`);
      if (!res.ok) throw new Error("Not found");
      const data = await res.json();
      setProducts([data]); // backend returns a single product object so we wrapped it in an array to map thru it later
    } catch (err) {
      alert("No product found");
      console.log(err);
    }
  }

  const deleteProduct = async(id) => {
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      console.log('Error deleting product', err);
    }
  };

  const updateProduct = (id) => {
    navigate(`/update/${id}`);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if(!sortOption) return;
    const [key, order] = sortOption.split("-");
    const sorted = bubbleSort([...products], key);
    if (order === "desc") sorted.reverse();
    setProducts(sorted);
  }, [sortOption]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">🛒 Product List</h2>

      {/* 🔍 Search Bar */}
      <form onSubmit={searchProduct} className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-l-lg w-64 shadow-sm focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Sorting Dropdown */}
      <div className="flex justify-center mb-10">
        <select
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value=""> Sort Products </option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="quantity-asc">Stock: Low → High</option>
          <option value="quantity-desc">Stock: High → Low</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {products.map((p) => (
          p.quantity > 0 &&
          <ProductCard
            key={p._id}
            product={p}
            onDelete={deleteProduct}
            onUpdate={() => updateProduct(p._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;