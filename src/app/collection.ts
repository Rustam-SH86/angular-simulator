export class Collection<T> {
  private items: T[];

  constructor(items: T[] = []) {
    this.items = items;
  }

  getAll(): T[] {
    return this.items;
  }

  getOne(index: number): T | undefined {
    return this.items[index];
  }

  clear(): void {
    this.items = [];
  }

  delete(index: number): void {
    this.items.splice(index, 1);
  }

  replace(index: number, newItem: T): void {
    this.items[index] = newItem;
  }
}