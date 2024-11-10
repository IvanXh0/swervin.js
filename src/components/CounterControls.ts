import { html } from "@/core/html";
import { createComponent } from "../core/component";
import { counter } from "@/store/counter";
import { emit, clearEmitters } from "@/core/emitter";

export default createComponent(
  () => {
    return html`
      <div class="counter-controls">
        <h2>Counter Controls</h2>
        <div class="controls">
    <button onclick="${emit(() => counter.increment(1))}">+1</button>
    <button onclick="${emit(() => counter.decrement(1))}">-1</button>
    <button onclick="${emit(() => counter.reset())}">Reset</button>
        </div>
        <div class="controls">
          <button onclick="window.navigate('/display')">Go to Display</button>
        </div>
      </div>
      <div>
        <h1>One more display here</h1>
        <p>Counter display is: ${counter.signal.get().count}</p></p>
      </div>
    `;
  },
  {
    onDestroy: () => {
      clearEmitters();
    },
  },
);
