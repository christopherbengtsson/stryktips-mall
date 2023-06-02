import { observer } from "mobx-react";
import { Layout, Table } from "../components";
import { useMainStore } from "../stores/useMainStore";
import { Bet, Indeterminate } from "../components/BetButton";
import { Bets, initialSavedCoupon } from "../stores/StorageService";
import { useState } from "react";
import styled from "styled-components";
import { Body, Headline } from "../components/core/fonts";
import { OutlinedButton } from "../components/OutlinedButton";

export const Main = observer(function Main() {
  const store = useMainStore();
  const draws = store.draws?.at(0);
  const events = draws?.drawEvents;

  const [bets, setBets] = useState<Bets>(
    store.storageService.savedCoupon?.bets ?? {}
  );

  const handleBetClick = ({
    bet,
    gameNumber,
    state,
  }: {
    bet: Bet;
    gameNumber: number;
    state: Indeterminate;
  }) => {
    const newBets: Bets = { ...bets };
    newBets[gameNumber][bet] = state;

    setBets(newBets);
    store.storageService.bets = newBets;
  };

  const clearCoupong = () => {
    setBets({});
    store.storageService.bets = initialSavedCoupon;
  };

  return (
    <Layout>
      <Headline>
        {draws?.regCloseDescription ?? "Stryktipset öppnar tisdag kl. 07:00."}
      </Headline>
      <SpaceBetweenContainer>
        <Body>Senast uppdaterad {store.lastUpdated?.toLocaleTimeString()}</Body>
        <OutlinedButton onClick={clearCoupong}>Rensa kupong</OutlinedButton>
      </SpaceBetweenContainer>

      {events && (
        <Table
          initialsBets={store.storageService?.savedCoupon?.bets}
          events={events}
          onBetClick={handleBetClick}
        />
      )}
    </Layout>
  );
});

const SpaceBetweenContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
