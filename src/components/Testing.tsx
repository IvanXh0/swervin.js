import { createComponent } from "@/core/component";
import { emit } from "@/core/emitter";
import { createElement } from "@/core/jsx";
import { counter } from "@/store/counter";

export default createComponent(() => (
  <div>
    <h2>Testing</h2>
    <p>Testing</p>
    <p>Current count is {counter.signal.get().count}</p>
    <button onclick={emit(() => window.navigate("/"))}>go back to home</button>
  </div>
));
