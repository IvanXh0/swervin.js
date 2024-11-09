import { html } from "@/core/html";
import { createComponent } from "../core/component";
import { counterState } from "../store/counter";

export default createComponent(
  () => html`
    <div class="counter-controls">
      <h2>Counter Controls</h2>
      <div class="controls">
        <button onclick="window.increment()">+1</button>
        <button onclick="window.decrement()">-1</button>
        <button onclick="window.reset()">Reset</button>
      </div>
      <div class="controls">
        <button onclick="window.navigate('/display')">Go to Display</button>
      </div>
    </div>
  `,
  {
    onCreate: () => {
      (window as any).increment = () => {
        counterState.set(counterState.get() + 1);
      };

      (window as any).decrement = () => {
        counterState.set(counterState.get() - 1);
      };

      (window as any).reset = () => {
        counterState.set(0);
      };
    },
    onDestroy: () => {
      delete (window as any).increment;
      delete (window as any).decrement;
      delete (window as any).reset;
    },
  },
);
