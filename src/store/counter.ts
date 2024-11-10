import { createStore } from ".";

type CounterState = {
  count: number;
};

const counterReducers = {
  increment: (state: CounterState, amount: number) => ({
    ...state,
    count: state.count + amount,
  }),
  decrement: (state: CounterState, amount: number) => ({
    ...state,
    count: state.count - amount,
  }),
  reset: (state: CounterState) => ({
    ...state,
    count: 0,
  }),
};

export const counter = createStore({ count: 0 }, counterReducers);
