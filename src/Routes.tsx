import { observer } from "mobx-react";
import { Main } from "./screens/Main";
import { useMainStore } from "./stores/useMainStore";

export const Routes = observer(function Routes() {
  const store = useMainStore();

  if (store.isLoading) {
    return <h1>Loading...</h1>;
  }

  return <Main />;
});
