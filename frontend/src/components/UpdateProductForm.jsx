import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function UpdateProductForm() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [product, setProducts] = useState({
        name: '',
        category: '',
        price :'',
        quantity: '',
        supplier: ''
    })

    const handleChange = (e) => {
        setProducts({ ...product, [e.target.name]: e.target.value})
        
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await fetch(`http://localhost:5000/api/products/${id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(product),
            });
            alert("Product updated successfully!");
            navigate("/products");
        } catch (err) {
            console.error("Error updating product", err);
            alert("Failed to update product");
        }
    }


    useEffect(()=> {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/products/${id}`)
                const data = await res.json();
                setProducts(data)
            }
            catch(err){
                console.log("error fetching product", err)
            }
        }
        if (id) fetchProduct()
        // console.log("id from params", id)

    }, [id])
  
    return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          ✏️ Update Product
        </h2>

        <div className="space-y-4">
          {["name", "category", "price", "quantity", "supplier"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 font-medium capitalize">
                {field}
              </label>
              <input
                type={field === "price" || field === "quantity" ? "number" : "text"}
                name={field}
                value={product[field]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all"
        >
          Update
        </button>
      </form>
    </div>
    );
}

export default UpdateProductForm;
