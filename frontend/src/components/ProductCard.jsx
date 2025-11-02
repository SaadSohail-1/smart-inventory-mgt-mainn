import React from 'react'

function ProductCard({product, onDelete, onUpdate}) {
  return (
    <div className="bg-white  shadow-md rounded-2xl p-5 hover:shadow-xl transition-all duration-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {product.name}
      </h3>
      <p className="text-gray-700 mb-1">
        <span className="font-medium">Price:</span> ${product.price}
      </p>
      <p className="text-gray-700 mb-1">
        <span className="font-medium">Stock:</span> {product.quantity > 5 ? product.quantity : `${product.quantity} Low Stock!`}
        {/* {product.quantity > 5 (<span className="font-medium">Stock: {product.quantity}</span>) : (<span className="font-medium">Low Stock: {product.quantity}</span>)} */}
      </p>

      <p className="text-gray-600 mb-4">{product.description}</p>
      <div className="flex gap-3">
        <button
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all duration-150"
          onClick={() => onUpdate(product._id)}
        >
          Update
        </button>
        <button
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-all duration-150"
          onClick={() => onDelete(product._id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default ProductCard
