export class TypeStorage<T extends object> {
  removeItem<K extends keyof T>(key: K & string) {
    localStorage.removeItem(key);
  }
  selectItem<K extends keyof T>(key: K & string): T[K] | null {
    const data = localStorage.getItem(key as string);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }
  updateItem<K extends keyof T>(key: K & string, value: T[K]) {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  }
}
