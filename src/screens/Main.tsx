import { observer } from "mobx-react";
import { Layout, Table } from "../components";
import { useMainStore } from "../stores/useMainStore";
import { DrawEvent } from "../api";

export const Main = observer(function Main() {
  const store = useMainStore();
  return (
    <Layout>
      <h1>{store.draws?.at(0)?.regCloseDescription}</h1>
      <h4>Last updated {store.lastUpdated?.toLocaleTimeString()}</h4>

      <Table events={store.draws?.at(0)?.drawEvents ?? ([] as DrawEvent[])} />
    </Layout>
  );
});
