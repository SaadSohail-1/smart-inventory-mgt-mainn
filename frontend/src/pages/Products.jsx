import { useEffect, useState } from 'react';
import React from 'react'
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import { mergeSort } from '../utils/mergeSort';

function Products() {
    const [products, setProducts] = useState([]);
    const [sortKey, setSortKey] = useState('');
    const navigate = useNavigate();
    
    const getProducts = async() =>{
        try{
            const res = await fetch("http://localhost:5000/api/products")
            const data = await res.json()
            setProducts(data);
        } catch (err) {
            alert("Error fetching data");
            console.log(err);
        }
    }

    const deleteProduct = async(id) => {
      try{
        await fetch(`http://localhost:5000/api/product/${id}`, {
          method: "DELETE",
        })
        setProducts(products.filter(p => p._id !== id))
      }
      catch (err){
        console.log('Error deleting product', err);
      }
    }

    const updateProduct = (id) => {
        navigate(`/update/${id}`)
    }

    useEffect(()=>{
        getProducts();
    }, []);

    useEffect(() => {
    if (sortKey) {
      setProducts((prev) => mergeSort([...prev], sortKey));
    }
  }, [sortKey]);

return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        🛒 Product List
      </h2>

      {/* Sorting Dropdown */}
      <div className="flex justify-center mb-10">
        <select
          onChange={(e) => setSortKey(e.target.value)}
          className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value=""> Sort Products </option>
          <option value="price">Sort by Price</option>
          <option value="quantity">Sort by Stock</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {products.map((p) => (
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
