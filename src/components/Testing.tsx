import { createComponent } from "@/core/component";
import { emit } from "@/core/emitter";
import { createElement } from "@/core/jsx";
import { useLifecycle } from "@/core/lifecycle";
import { counter } from "@/store/counter";

export default createComponent(() => {
  useLifecycle({
    onCreate: () => {
      console.log("Component created");
    },
    onDestroy: () => {
      console.log("Component destroyed");
    },
  });

  return (
    <div class="testing">
      <div>Count: {counter.signal.get().count}</div>
      <button onclick={emit(() => window.navigate("/"))}>Back</button>
    </div>
  );
});
