import { Component } from "@/core/component";
import { DOMRenderer } from "@/core/renderer";
import { Router } from "@/router";

declare global {
  interface Window {
    navigate: (path: string) => void;
  }
}

export interface CreateAppOptions {
  rootElement?: string;
  routes: Record<string, () => Component>;
}

export function createApp(options: CreateAppOptions) {
  const { rootElement = "app", routes } = options;

  let renderer: DOMRenderer | null = null;

  function initApp() {
    const router = new Router();

    Object.entries(routes).forEach(([path, component]) => {
      router.addRoute(path, component);
    });

    window.navigate = (path: string) => router.navigate(path);

    const app = document.getElementById(rootElement);
    if (!app) {
      throw new Error(`Root element "${rootElement}" not found`);
    }

    renderer?.destroy();
    renderer = new DOMRenderer(app, router);
    renderer.mount();

    return { router, renderer };
  }

  if (document.readyState === "loading") {
    window.addEventListener("load", initApp);
  } else {
    return initApp();
  }
}
