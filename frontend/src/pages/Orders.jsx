import { useState, useEffect, useRef } from "react";
import { LinkedList } from "../utils/LinkedList";

export default function Orders() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [queue, setQueue] = useState([]);
  const [message, setMessage] = useState("");
  // const [orderHistory, setOrderHistory] = useState([])
  const orderHistoryLL = useRef(new LinkedList());
  // const orderHistoryLL = new LinkedList() //cant use this because recreaeted on every render


  const API_BASE = "http://127.0.0.1:5000/api";

  // ✅ Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // ✅ Fetch queue
  const fetchQueue = async () => {
    try {
      const res = await fetch(`${API_BASE}/orders/status`);
      const data = await res.json();
      if (data.success) setQueue(data.allOrders || []);
    } catch (err) {
      console.error("Error fetching queue:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchQueue();
  }, []);

  // ✅ Place an order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!selectedProduct) return setMessage("Please select a product");
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProduct,
          quantity: Number(quantity),
          customerId,
        }),
      });
      const data = await res.json();
      if(data.success){
        // orderHistoryLL.push(data.order)
        orderHistoryLL.current.push(data.order) //pushing to current because of useRef
      }
      setMessage(data.message || "Order placed");
      fetchQueue();
    } catch (err) {
      setMessage("Error placing order");
    }
  };

  // ✅ Process next
  const handleProcessNext = async () => {
    try {
      const res = await fetch(`${API_BASE}/orders/process`, { method: "POST" });
      const data = await res.json();
      setMessage(data.message);
      fetchQueue();
      fetchProducts(); // update product stock after processing
    } catch (err) {
      setMessage("Error processing order");
    }
  };

  return (

    <div className="flex bg-white items-center justify-around">
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Order Management</h2>

      <form onSubmit={handlePlaceOrder} className="space-y-3">
        {/* ✅ Product dropdown */}
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="border rounded w-full p-2"
          required
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name} — Stock: {p.quantity}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border rounded w-full p-2"
          required
        />

        <input
          type="text"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          className="border rounded w-full p-2"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Place Order
        </button>
      </form>

      <button
        onClick={handleProcessNext}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
      >
        Process Next Order
      </button>

      {message && <p className="mt-3 text-gray-700">{message}</p>}

      <h3 className="mt-6 text-lg font-semibold">Queue Status</h3>
      {queue.length === 0 ? (
        <p>No orders in queue</p>
      ) : (
        <ul className="mt-2 space-y-1">
          {queue.map((order, i) => (
            <li key={i} className="border p-2 rounded">
              <strong>{order.id}</strong> — {order.productName} ({order.quantity})
            </li>
          ))}
        </ul>
      )}
      </div>
      <div className="bg-white p-6 max-w-lg mx-aut shadow rounded-lg mr-auto">
        <h1 className="font-bold text-center mb-5">History Nodes</h1>
        {orderHistoryLL.current.head === null ? (
          <div>No Items to Show</div>
        ) : (
          orderHistoryLL.current===null ? <div>No items to show</div> : orderHistoryLL.current.traverse().map((item, i) => (
            <div key={i}>
          {item.id} - {item.productName} ({item.quantity})
        </div>
         ))
        )}
     </div>
      </div>
  );
}
