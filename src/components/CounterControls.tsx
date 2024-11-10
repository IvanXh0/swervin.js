import { createComponent } from "@/core/component";
import { counter } from "@/store/counter";
import { emit } from "@/core/emitter";
import { createElement } from "@/core/jsx";

export default createComponent(
  () => (
    <div class="counter-controls">
      <h2>Counter Controls</h2>
      <div class="controls">
        <button onclick={emit(() => counter.increment(1))}>+1</button>
        <button onclick={emit(() => counter.decrement(1))}>-1</button>
        <button onclick={emit(() => counter.reset())}>Reset</button>
      </div>
      <div>Count: {counter.signal.get().count}</div>
      {/* Keyboard shortcuts will work on this component */}
    </div>
  ),
  {
    onCreate: () => {
      // Setup keyboard shortcuts
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === "ArrowUp") counter.increment(1);
        if (e.key === "ArrowDown") counter.decrement(1);
        if (e.key === "r") counter.reset();
      };

      // Add the event listener
      document.addEventListener("keydown", handleKeyPress);

      // Return cleanup function from onCreate if needed
      return () => {
        document.removeEventListener("keydown", handleKeyPress);
      };
    },
    onDestroy: () => {
      // Any additional cleanup if needed
      console.log("Component is being destroyed");
    },
  },
);
