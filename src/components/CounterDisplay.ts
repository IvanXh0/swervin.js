import { createComponent } from "@/core/component";
import { html } from "@/core/html";
import { counterState } from "@/store/counter";

export default createComponent(() => {
  const count = counterState.get();

  return html`
    <div class="counter-display">
      <h2>Counter Display</h2>
      <div class="count">Current Count: ${count}</div>
    </div>
    <div class="controls">
      <button onclick="window.navigate('/')">Go to Controls</button>
    </div>
  `;
});
