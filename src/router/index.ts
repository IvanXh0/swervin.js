import { Signal } from "@/core/signal";

export interface Route {
  path: string;
  component: () => any;
}

export class Router {
  private routes: Route[] = [];
  private currentRoute: Signal<string>;

  constructor() {
    const initialPath = window.location.pathname;
    this.currentRoute = new Signal<string>(initialPath);

    window.addEventListener("popstate", () => {
      this.currentRoute.set(window.location.pathname);
    });
  }

  addRoute(path: string, component: () => any): void {
    this.routes.push({ path, component });
  }

  navigate(path: string): void {
    if (this.currentRoute.get() === path) return;

    window.history.pushState({}, "", path);
    this.currentRoute.set(path);
  }

  getCurrentComponent(): (() => any) | null {
    const route = this.routes.find((route) => {
      if (route.path === this.currentRoute.get()) return true;

      const pattern = new RegExp(
        "^" + route.path.replace(/:\w+/g, "([^/]+)") + "$",
      );
      return pattern.test(this.currentRoute.get());
    });

    return route?.component || null;
  }

  getParams(): Record<string, string> {
    const route = this.routes.find((route) => {
      const pattern = new RegExp(
        "^" + route.path.replace(/:\w+/g, "([^/]+)") + "$",
      );
      return pattern.test(this.currentRoute.get());
    });

    if (!route) return {};

    const paramNames = (route.path.match(/:\w+/g) || []).map((param) =>
      param.slice(1),
    );
    const paramValues = this.currentRoute
      .get()
      .match(new RegExp(route.path.replace(/:\w+/g, "([^/]+)")));

    const params: Record<string, string> = {};
    if (paramValues) {
      paramNames.forEach((name, index) => {
        params[name] = paramValues[index + 1];
      });
    }

    return params;
  }
}
