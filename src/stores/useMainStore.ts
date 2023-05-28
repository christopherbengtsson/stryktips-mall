import { useContext } from "react";
import { MainStoreContext } from "./Providers/MainStoreProvider";

export function useMainStore() {
  return useContext(MainStoreContext);
}
