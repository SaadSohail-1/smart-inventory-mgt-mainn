import React from 'react'
import { useState } from 'react'

function AddProduct() {

    // const [name, setName] = useState("")
    // const [category, setCategory] = useState("")
    // const [price, setPrice] = useState("")
    // const [quantity, setQuantity] = useState(0)

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        quantity: "",
        supplier: ""
    })
    
    const [showPopup, setShowPopup] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:5000/api/products", {
                method: "POST",
                headers : {"Content-type": "application/json"},
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log("Server response: " , data)

            if (response.ok){
                setFormData({
                    name: "",
                    category: "",
                    price: "",
                    quantity: "",
                    supplier: ""
                })

                setShowPopup(true)
                setTimeout(() => {
                    setShowPopup(false)
                }, 2000);
            } else {
                alert("Failed to add product.")
            }

        }
        catch (err){
            console.log("error: ", err)
        }
    }

  return (
  <div className="min-h-screen bg-blue-50 flex items-center justify-center">
    {showPopup && (
        <div className='absolute top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in'>
            Product Added Successfully
        </div>
    )}
    <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
        Add a Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="supplier"
          placeholder="Supplier (optional)"
          value={formData.supplier}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  </div>
)

}

export default AddProduct
