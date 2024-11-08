import "./styles/main.css";
import { Router } from "./router";
import { DOMRenderer } from "./core/renderer";
import { getComponent } from "./components";

declare global {
  interface Window {
    navigate: (path: string) => void;
  }
}

let renderer: DOMRenderer | null = null;

function initApp() {
  const router = new Router();

  router.addRoute("/", () => getComponent("TestComponent")({}));

  window.navigate = (path: string) => router.navigate(path);

  const app = document.getElementById("app");
  if (!app) {
    throw new Error("App element not found");
  }

  renderer?.destroy();
  renderer = new DOMRenderer(app, router);
  renderer.mount();
}

if (document.readyState === "loading") {
  window.addEventListener("load", initApp);
} else {
  initApp();
}
