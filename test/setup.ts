import '@testing-library/jest-dom/vitest';

class LocalStorageMock {
  private values = new Map<string, string>();

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }
  setItem(key: string, value: string) {
    this.values.set(key, String(value));
  }
  removeItem(key: string) {
    this.values.delete(key);
  }
  clear() {
    this.values.clear();
  }
}

Object.defineProperty(window, 'localStorage', {
  value: new LocalStorageMock(),
  configurable: true,
});
