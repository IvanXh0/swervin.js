import { createComponent } from "@/core/component";
import { counter } from "@/store/counter";
import { emit } from "@/core/emitter";
import { createElement } from "@/core/jsx";

export default createComponent(() => (
  <div class="counter-controls">
    <h2>Counter Controls</h2>
    <div class="controls">
      <button onclick={emit(() => counter.increment(1))}>+1</button>
      <button onclick={emit(() => counter.decrement(1))}>-1</button>
      <button onclick={emit(() => counter.reset())}>Reset</button>
    </div>
    <div>Count: {counter.signal.get().count}</div>
  </div>
));
