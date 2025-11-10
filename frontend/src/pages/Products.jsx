import { useEffect, useState } from 'react';
import React from 'react'
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import { bubbleSort } from '../utils/Sort';

function Products() {
    const [products, setProducts] = useState([]);
    const [sortOption, setSortOption] = useState("")
    // const [sortKey, setSortKey] = useState('')
    const navigate = useNavigate();

    // const undoStack = useRef([])
    
    const getProducts = async() =>{
        try{
            const res = await fetch("http://localhost:5000/api/products")
            console.log("Fetch Status", res.status)
            const data = await res.json()
            console.log("Fetched products: ", data)
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
    // if (sortKey) {
    //   setProducts((prev) => bubbleSort([...prev], sortKey));
    // }
    if(!sortOption) return;
    const [key, order] = sortOption.split("-")
    const sorted = bubbleSort([...products], key);
    if (order === "desc") sorted.reverse()
      setProducts(sorted);

  }, [sortOption]);

return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        🛒 Product List
      </h2>

      {/* Sorting Dropdown */}
     <div className="flex justify-center mb-10">
        <select
          onChange={(e) => setSortOption(e.target.value)} // ✅ fix here
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
        {products.map((p) => ( p.quantity > 0 && 
          <ProductCard
            key={p._id}
            product={p}
            onDelete={deleteProduct}
            onUpdate={() => updateProduct(p._id)}
          />
        ))}
      </div><></>
    </div> 
  );
}

export default Products;
