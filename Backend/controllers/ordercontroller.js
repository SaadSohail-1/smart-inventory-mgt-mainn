import asyncHandler from "../utils/asynchandler.js";
import { orderQueue } from "../utils/orderQueue.js";
import Product from "../models/productModel.js";

//implementation of order processing by queue 

export const placeProductOrder = asyncHandler(async (req, res) => {
  const { productId, quantity, customerId } = req.body;
  
  // 1. Check product availability
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  
  if (product.quantity < quantity) {
    return res.status(400).json({ 
      message: `Insufficient stock. Only ${product.quantity} items available` 
    });
  }

  // 2. Create order
  const order = {
    id: `ORD-${Date.now()}`,
    productId: product._id,
    productName: product.name,
    quantity,
    customerId,
    status: 'queued',
    price: product.price * quantity,
    createdAt: new Date()
  };

  // 3. Add to processing queue
  orderQueue.enqueue(order);
  console.log(`Order ${order.id} added to queue`);

  res.status(201).json({
    success: true,
    message: 'Order placed in queue',
    order,
    queuePosition: orderQueue.size()
  });
});

export const processNextOrder = asyncHandler(async (req, res) => {
  const nextOrder = orderQueue.dequeue();
  
  if (!nextOrder) {
    return res.status(200).json({
      success: true,
      message: 'No orders in queue',
      order: null
    });
  }

  try {
    // 1. Update product quantity
    const product = await Product.findById(nextOrder.productId);
    if (!product) {
      throw new Error('Product not found');
    }

    if (product.quantity < nextOrder.quantity) {
      throw new Error('Insufficient stock for processing');
    }

    // 2. Update inventory
    product.quantity -= nextOrder.quantity;
    await product.save();

    // 3. Update order status
    nextOrder.status = 'completed';
    nextOrder.completedAt = new Date();

    res.status(200).json({
      success: true,
      message: 'Order processed successfully',
      order: nextOrder,
      remainingInQueue: orderQueue.size()
    });

  } catch (error) {
    // If processing fails, add back to front of queue
    orderQueue.orders.unshift(nextOrder);
    orderQueue.rear++;
    
    res.status(500).json({
      success: false,
      message: 'Error processing order',
      error: error.message,
      orderId: nextOrder.id
    });
  }
});

export const getOrderQueueStatus = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    queueSize: orderQueue.size(),
    nextOrder: orderQueue.peek(),
    allOrders: orderQueue.getAllOrders()
  });
});
