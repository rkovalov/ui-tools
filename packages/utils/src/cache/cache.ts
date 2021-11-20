export class Cache<T> {
  private data: { [key: string]: T } = {};
  private timers: { [key: string]: ReturnType<typeof setTimeout> } = {};
  private expireTime?: number;

  constructor(options?: { expireTime?: number }) {
    if (options?.expireTime) {
      this.expireTime = options.expireTime;
    }
  }

  get(key: string): T | undefined {
    return this.data[key];
  }

  add(key: string, data: T): void {
    this.clearTimer(key);
    this.data[key] = data;
    if (typeof this.expireTime === 'number') {
      this.timers[key] = setTimeout(() => {
        delete this.data[key];
      }, this.expireTime);
    }
  }

  delete(key: string): void {
    this.clearTimer(key);
    delete this.data[key];
  }

  clearTimer(key: string): void {
    if (this.timers[key]) {
      clearTimeout(this.timers[key] as ReturnType<typeof setTimeout>);
      delete this.timers[key];
    }
  }

  getKeys(): string[] {
    return Object.keys(this.data);
  }

  clean(): void {
    Object.values(this.timers).forEach(timer => clearTimeout(timer));
    this.data = {};
    this.timers = {};
  }
}
