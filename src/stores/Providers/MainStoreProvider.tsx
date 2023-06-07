import { ReactNode, createContext } from 'react';
import type { MainStore } from '../MainStore';

export const MainStoreContext = createContext<MainStore>({} as MainStore);

export function MainStoreProvider({ store, children }: { store: MainStore; children: ReactNode }) {
  return <MainStoreContext.Provider value={store}>{children}</MainStoreContext.Provider>;
}
