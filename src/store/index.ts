import { Signal } from "@/core/signal";

type PayloadFromReducer<T, R> = R extends (state: T) => T
  ? void
  : R extends (state: T, payload?: infer P) => T
    ? P | undefined
    : R extends (state: T, payload: infer P) => T
      ? P
      : never;

export type Reducers<T> = {
  [K: string]: (state: T, payload?: any) => T;
};

export type ActionCreators<T, R extends Reducers<T>> = {
  [K in keyof R]: (payload: PayloadFromReducer<T, R[K]>) => void;
};

export interface Store<T, R extends Reducers<T>> {
  signal: Signal<T>;
  select: <U>(selector: (state: T) => U) => U;
  dispatch(action: keyof R, payload?: any): void;
}

export function createStore<T, R extends Reducers<T>>(
  initialState: T,
  reducers: R,
): Store<T, R> & ActionCreators<T, R> {
  const signal = new Signal<T>(initialState);

  const store = {
    signal,

    select<U>(selector: (state: T) => U): U {
      return selector(signal.get());
    },

    dispatch(action: keyof R, payload?: any) {
      const reducer = reducers[action];
      if (reducer) {
        signal.set(reducer(signal.get(), payload));
      }
    },
  };

  const actionCreators = Object.keys(reducers).reduce(
    (acc, type) => ({
      ...acc,
      [type]: (payload?: any) => store.dispatch(type, payload),
    }),
    {} as ActionCreators<T, R>,
  );

  return { ...store, ...actionCreators };
}
