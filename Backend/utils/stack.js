export class ActivityStack {
  constructor(maxSize = 10) {
    this.items = [];
    this.maxSize = maxSize;
  }

  // Add item to the stack
  push(item) {
    if (this.items.length >= this.maxSize) {
      this.items.pop(); // Remove oldest item if stack is full
    }
    this.items.unshift(item); // Add new item to the beginning
    return item;
  }

  // Remove and return the top item
  pop() {
    if (this.isEmpty()) return null;
    return this.items.shift();
  }

  // View the top item without removing it
  peek() {
    return this.isEmpty() ? null : this.items[0];
  }

  // Check if stack is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Get current stack size
  size() {
    return this.items.length;
  }

  // Get all items in the stack (newest first)
  getAllItems() {
    return [...this.items];
  }

  // Clear the stack
  clear() {
    this.items = [];
  }
}

// Create a singleton instance for inventory changes
export const inventoryActivityStack = new ActivityStack(20); // Keep last 20 inventory changes