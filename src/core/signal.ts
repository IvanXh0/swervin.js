export class Signal<T> {
  private subscribers: Set<() => void> = new Set();
  private value: T;

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  get(): T {
    if (Signal.activeEffect) {
      this.subscribers.add(Signal.activeEffect);
    }
    return this.value;
  }

  set(newValue: T): void {
    if (this.value === newValue) return;
    this.value = newValue;
    this.notify();
  }

  private notify(): void {
    this.subscribers.forEach((subscriber) => subscriber());
  }

  static activeEffect: (() => void) | null = null;
}
