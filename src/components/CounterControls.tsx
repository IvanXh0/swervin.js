import { createComponent } from "@/core/component";
import { counter } from "@/store/counter";
import { emit } from "@/core/emitter";
import { createElement } from "@/core/jsx";
import { useLifecycle } from "@/core/lifecycle";

export default createComponent(() => {
  let handleKeyPress: ((e: KeyboardEvent) => void) | null = null;

  useLifecycle({
    onCreate: () => {
      handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === "ArrowUp") counter.increment(1);
        if (e.key === "ArrowDown") counter.decrement(1);
        if (e.key === "r") counter.reset();
      };
      document.addEventListener("keydown", handleKeyPress);
    },
    onDestroy: () => {
      if (handleKeyPress) {
        document.removeEventListener("keydown", handleKeyPress);
        handleKeyPress = null;
      }
      console.log("Component is being destroyed");
    },
  });

  return (
    <div class="counter-controls">
      <h2>Counter Controls</h2>
      <div class="controls">
        <button onclick={emit(() => counter.increment(1))}>+1</button>
        <button onclick={emit(() => counter.decrement(1))}>-1</button>
        <button onclick={emit(() => counter.reset())}>Reset</button>
      </div>
      <div>Count: {counter.signal.get().count}</div>
      <div onclick={emit(() => window.navigate("/testing"))}>
        navigate to testing
      </div>
    </div>
  );
});
