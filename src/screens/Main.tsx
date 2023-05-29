import { observer } from "mobx-react";
import { Layout, Table } from "../components";
import { useMainStore } from "../stores/useMainStore";
import { DrawEvent } from "../api";

export const Main = observer(function Main() {
  const store = useMainStore();
  const draws = store.draws?.at(0);
  const events = draws?.drawEvents;

  return (
    <Layout>
      <h1>
        {draws?.regCloseDescription ?? "Stryktipset öppnar tisdag kl. 07:00."}
      </h1>
      <h4>Senast uppdaterad {store.lastUpdated?.toLocaleTimeString()}</h4>
      {events && <Table events={events} />}
    </Layout>
  );
});
