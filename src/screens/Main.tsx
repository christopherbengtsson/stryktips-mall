import { observer } from "mobx-react";
import { Layout, Table } from "../components";
import { useMainStore } from "../stores/useMainStore";
import {
  Bets,
  BettingOption,
  BettingState,
  initialSavedCoupon,
} from "../stores/StorageService";
import { ChangeEventHandler, useMemo, useState } from "react";
import styled from "styled-components";
import { Trash2 as Trash } from "@styled-icons/evaicons-solid";
import { SvenskaSpelIcon } from "../components/assets/icons";
import { Body, Title1 } from "../components/core/fonts";
import { OutlinedButton } from "../components/OutlinedButton";
import { buildSvenskaSpelURL } from "../utils/stryktipsUrl";
import { calculateCost } from "../utils/couponCost";
import { CouponType } from "../api";
import { Select } from "../components/Select";

const SELECT_OPTIONS = [
  {
    label: "Stryktipset",
    value: "stryktipset",
  },
  {
    label: "Europatipset",
    value: "europatipset",
  },
];

export const Main = observer(function Main() {
  const store = useMainStore();
  const draw = store.draws?.at(0);
  const events = draw?.drawEvents;

  const [bets, setBets] = useState<Bets>(
    store.storageService.getCoupon(store.drawNumber)?.bets ?? []
  );

  const valid = useMemo(() => {
    return bets.every((bet) => {
      return (
        bet[1] === "clicked" || bet.X === "clicked" || bet[2] === "clicked"
      );
    });
  }, [bets]);

  const { totalCost, totalCostIndetermined } = useMemo(
    () => calculateCost(bets),
    [bets]
  );

  const handleBetClick = ({
    bet,
    gameNumber,
    state,
  }: {
    bet: BettingOption;
    gameNumber: number;
    state: BettingState;
  }) => {
    const newBets: Bets = [...bets];
    newBets[gameNumber - 1][bet] = state;

    setBets(newBets);
    store.storageService.setBets(newBets, store.drawNumber);
  };

  const clearCoupong = () => {
    setBets([]);
    store.storageService.setBets(initialSavedCoupon, store.drawNumber);
  };

  const openStryktipset = () => {
    const url = buildSvenskaSpelURL({
      drawNumber: store.drawNumber as number,
      bets,
      valid,
      couponType: store.couponType,
    });
    window.open(url, "_blank");
  };

  const handleCouponChange: ChangeEventHandler<HTMLSelectElement> = async ({
    target,
  }) => {
    if (target.value) {
      const couponType = target.value as CouponType;
      store.storageService.setCouponType(couponType);

      await store.fetchState({ couponType });

      const coupon = store.storageService.getCoupon(store.drawNumber);
      setBets(coupon?.bets ?? []);
    }
  };

  return (
    <Layout
      scrollContainer
      leftNavigationItem={
        <Select
          name="coupon-select"
          value={store.couponType}
          options={SELECT_OPTIONS}
          onChange={handleCouponChange}
        />
      }
      footerProps={
        draw && (
          <CoupongActionsContainer padding>
            <OutlinedButton
              Icon={StyledSvenskaSpelIcon}
              onClick={openStryktipset}
              displayText
            >
              {totalCost === totalCostIndetermined
                ? totalCost
                : `${totalCost} (${totalCostIndetermined})`}{" "}
              KR
            </OutlinedButton>
          </CoupongActionsContainer>
        )
      }
    >
      <Header>
        <Title1>
          {draw?.regCloseDescription ?? "Stryktipset öppnar tisdag kl. 07:00."}
        </Title1>

        <SpaceBetweenContainer>
          <Body>
            Senast uppdaterad {store.lastUpdated?.toLocaleTimeString()}
          </Body>
        </SpaceBetweenContainer>

        {draw && (
          <CoupongActionsContainer>
            <OutlinedButton Icon={Trash} onClick={clearCoupong}>
              Rensa kupong
            </OutlinedButton>
          </CoupongActionsContainer>
        )}
      </Header>

      {events && (
        <Table
          couponType={store.couponType}
          initialsBets={bets}
          events={events}
          onBetClick={handleBetClick}
        />
      )}
    </Layout>
  );
});

const Header = styled.div`
  padding: 8px 16px;
`;

const StyledSvenskaSpelIcon = styled(SvenskaSpelIcon)`
  width: 20px;
  height: 20px;
  background: red;
`;

const SpaceBetweenContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CoupongActionsContainer = styled.div<{ padding?: boolean }>`
  display: flex;
  justify-content: flex-end;

  ${(p) => p.padding && `padding: ${p.theme.spacing.xs} ${p.theme.spacing.s}`}
`;
