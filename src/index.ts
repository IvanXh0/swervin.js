import { createApp } from "./create-app";
import { getComponent } from "./components";
import "./styles/main.css";

createApp({
  routes: {
    "/": () => getComponent("CounterControls")(),
    "/display": () => getComponent("CounterDisplay")(),
  },
});
