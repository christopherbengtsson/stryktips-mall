import { observer } from "mobx-react";
import { Layout, Table } from "../components";
import { useMainStore } from "../stores/useMainStore";
import {
  Bets,
  BettingOption,
  BettingState,
  initialSavedCoupon,
} from "../stores/StorageService";
import { useMemo, useState } from "react";
import styled from "styled-components";
import { Body, Headline } from "../components/core/fonts";
import { OutlinedButton } from "../components/OutlinedButton";
import { buildSvenskaSpelURL } from "../utils/stryktipsUrl";

export const Main = observer(function Main() {
  const store = useMainStore();
  const draws = store.draws?.at(0);
  const events = draws?.drawEvents;

  const [bets, setBets] = useState<Bets>(
    store.storageService.savedCoupon?.bets ?? {}
  );

  const valid = useMemo(() => {
    const bettingOptions = Object.values(bets);
    for (const bet of bettingOptions) {
      const clickedOptions = Object.values(bet).filter(
        (option) => option === "clicked"
      );
      if (clickedOptions.length === 0) {
        return false;
      }
    }
    return true;
  }, [bets]);

  const handleBetClick = ({
    bet,
    gameNumber,
    state,
  }: {
    bet: BettingOption;
    gameNumber: number;
    state: BettingState;
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

  const openStryktipset = () => {
    console.log(bets);
    const url = buildSvenskaSpelURL(store.drawNumber as number, bets, valid);
    console.log(url);
    window.open(url, "_blank");
  };

  return (
    <Layout>
      <Headline>
        {draws?.regCloseDescription ?? "Stryktipset öppnar tisdag kl. 07:00."}
      </Headline>
      <SpaceBetweenContainer>
        <Body>Senast uppdaterad {store.lastUpdated?.toLocaleTimeString()}</Body>
        <OutlinedButton onClick={clearCoupong}>Rensa kupong</OutlinedButton>
        <OutlinedButton onClick={openStryktipset}>
          För över till Stryktipset
        </OutlinedButton>
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
