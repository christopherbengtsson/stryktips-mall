import { isDev } from "./Constants";
import { Routes } from "./Routes";

import { MainStore } from "./stores/MainStore";
import { MainStoreProvider } from "./stores/Providers/MainStoreProvider";

const store = new MainStore();
store.init();

if (isDev) {
  // During development it is often helpful to expose the store globally
  window.store = store;
}

export function Application() {
  return (
    <MainStoreProvider store={store}>
      <Routes />
    </MainStoreProvider>
  );
}
