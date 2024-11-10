import { createComponent } from "@/core/component";
import { emit } from "@/core/emitter";
import { html } from "@/core/html";
import { counter } from "@/store/counter";

export default createComponent(
  () => html`
    <div class="container">
      <button onclick="${emit(() => counter.increment(1))}" class="btn">
        +1
      </button>
      <div class="count">Count: ${counter.signal.get().count}</div>
    </div>
    <div>Go back home <button onclick="window.navigate('/')">Home</button></div>
  `,
);
