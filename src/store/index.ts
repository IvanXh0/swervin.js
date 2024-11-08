import { Signal } from "@/core/signal";

export interface Store<T> {
  state: Signal<T>;
  dispatch(action: string, payload?: any): void;
}

export function createStore<T>(
  initialState: T,
  reducers: Record<string, (state: T, payload?: any) => T>,
): Store<T> {
  const state = new Signal<T>(initialState);

  return {
    state,
    dispatch(action: string, payload?: any) {
      const reducer = reducers[action];
      if (reducer) {
        state.set(reducer(state.get(), payload));
      }
    },
  };
}
