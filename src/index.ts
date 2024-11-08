import { Router } from "./router";
import { DOMRenderer } from "./core/renderer";

function initApp() {
  const router = new Router();

  const app = document.getElementById("app");
  if (app) {
    const renderer = new DOMRenderer(app, router);
    renderer.mount();
  }
}

window.addEventListener("load", initApp);
