export class OrderQueue {
  constructor() {
    this.orders = [];
    this.front = 0;
    this.rear = 0;
  }

  enqueue(order) {
    this.orders[this.rear] = order;
    this.rear++;
    console.log(`Order #${order.id} added to queue. Queue size: ${this.size()}`);
    return this.size();
  }

  dequeue() {
    if (this.isEmpty()) {
      console.log("Queue is empty - no orders to process");
      return null;
    }

    const removed = this.orders[this.front];
    this.front++;
    console.log(`Processing Order #${removed.id}. Remaining in queue: ${this.size()}`);
    return removed;
  }

  peek() {
    return this.isEmpty() ? null : this.orders[this.front];
  }

  size() {
    return this.rear - this.front;
  }

  isEmpty() {
    return this.rear === this.front;
  }

  getAllOrders() {
    return this.orders.slice(this.front, this.rear);
  }

  print() {
    if (this.isEmpty()) {
      console.log("Order queue is empty");
      return;
    }

    console.log("=== Current Order Queue ===");
    console.log(`Total orders: ${this.size()}`);
    console.log("Orders:", this.getAllOrders().map(o => `#${o.id}`).join(" -> "));
    console.log("===========================");
  }
}

// Export a single instance (singleton)
export const orderQueue = new OrderQueue();
