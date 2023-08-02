class Queue<T> {
  items: Array<T>;
  constructor(array?: Array<T>) {
    this.items = array ?? [];
  }

  get length() {
    return this.items.length;
  }

  enqueue(item: T) {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }
}

export default Queue;
