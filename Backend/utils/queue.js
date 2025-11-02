export class Queue {
  constructor() { this._data = []; }
  enqueue(x) { this._data.push(x); }
  dequeue() { return this._data.shift(); }
  peek() { return this._data[0] || null; }
  size() { return this._data.length; }
  isEmpty() { return this._data.length === 0; }
}
