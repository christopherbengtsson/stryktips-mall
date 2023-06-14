import { observer } from 'mobx-react';
import { Layout, Table } from '../components';
import { useMainStore } from '../stores/useMainStore';
import { Bets, BettingOption, BettingState, initialSavedCoupon } from '../stores/StorageService';
import { ChangeEventHandler, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Trash2 as Trash } from '@styled-icons/evaicons-solid';
import { SvenskaSpelIcon } from '../components/assets/icons';
import { Body, Title1 } from '../components/core/fonts';
import { OutlinedButton } from '../components/OutlinedButton';
import { buildSvenskaSpelURL } from '../utils/stryktipsUrl';
import { calculateCost } from '../utils/couponCost';
import { CouponType, Draw } from '../api';
import { Select } from '../components/Select';
import { Checkbox } from '../components/Checkbox';
import { DatePicker } from '../components/DatePicker';
import { CouponResultResponse, EventResult } from '../api/CouponResultResponse';
import { formatRelative } from 'date-fns';
import { sv } from 'date-fns/locale';

const COUPON_TYPE_SELECT_OPTIONS = [
  {
    label: 'Stryktipset',
    value: 'stryktipset',
  },
  {
    label: 'Europatipset',
    value: 'europatipset',
  },
];

const getHeader = ({
  draw,
  result,
  couponType,
  isResult,
}: {
  draw?: Draw;
  result: CouponResultResponse | null;
  couponType: CouponType;
  isResult: boolean;
}) => {
  {
    if (isResult && result) {
      return `Resultat ${result.result.productName} ${formatRelative(
        new Date(result.result.regCloseTime),
        new Date(),
        {
          locale: sv,
          weekStartsOn: 1,
        },
      )}`;
    }

    return draw?.regCloseDescription
      ? draw?.regCloseDescription
      : couponType === 'europatipset'
      ? 'Europatipset öppnar snart för spel igen.'
      : 'Stryktipset öppnar snart för spel igen.';
  }
};

export const Main = observer(function Main() {
  const store = useMainStore();
  const draw = store.draws?.at(0);
  const events = store.resultResponse?.result?.events ?? draw?.drawEvents;

  const [bets, setBets] = useState<Bets>(
    store.storageService.getSavedCoupon(store.drawNumber)?.bets ?? [],
  );

  const [showAnalysis, setShowAnalysis] = useState(store.showGameAnalysis);

  const valid = useMemo(() => {
    return bets.every((bet) => {
      return bet[1] === 'clicked' || bet.X === 'clicked' || bet[2] === 'clicked';
    });
  }, [bets]);

  const { totalCost, totalCostIndetermined } = useMemo(() => calculateCost(bets), [bets]);
  const isResult = !!(events?.at(0) as EventResult).outcome;

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
    if (store.drawNumber) {
      store.storageService.setBets(newBets, store.drawNumber);
    }
  };

  const clearCoupong = () => {
    setBets([]);
    if (store.drawNumber) {
      store.storageService.setBets(initialSavedCoupon, store.drawNumber);
    }
  };

  const openStryktipset = () => {
    const url = buildSvenskaSpelURL({
      drawNumber: store.drawNumber as number,
      bets,
      valid,
      couponType: store.couponType,
    });
    window.open(url, '_blank');
  };

  const handleCouponChange: ChangeEventHandler<HTMLSelectElement> = async ({ target }) => {
    if (target.value) {
      const couponType = target.value as CouponType;
      store.clearResults();
      store.storageService.setCouponType(couponType);

      await store.fetchState({ couponType });

      const coupon = store.storageService.getSavedCoupon(store.drawNumber);
      setBets(coupon?.bets ?? []);
    }
  };

  const handleShowAnalysis: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const checked = target.checked;
    store.storageService.showAnalysis = checked;
    setShowAnalysis(checked);

    if (checked && !store.gameAnalysis) {
      store.fetchState({
        couponType: store.couponType,
        fetchAnalysis: !store.analysisResponse,
        inBackground: true,
      });
    }
  };

  return (
    <Layout
      scrollContainer
      leftNavigationItem={
        <Select
          name="coupon-select"
          value={store.couponType}
          options={COUPON_TYPE_SELECT_OPTIONS}
          onChange={handleCouponChange}
        />
      }
      rightNavigationItem={<DatePicker />}
      footerProps={
        draw && (
          <CoupongFooterContainer padding>
            <OutlinedButton
              Icon={StyledSvenskaSpelIcon}
              disabled={isResult}
              onClick={openStryktipset}
              displayText
            >
              {totalCost === totalCostIndetermined
                ? totalCost
                : `${totalCost} (${totalCostIndetermined})`}{' '}
              KR
            </OutlinedButton>
          </CoupongFooterContainer>
        )
      }
    >
      <Header>
        <Title1>
          {getHeader({
            couponType: store.couponType,
            isResult,
            draw,
            result: store.resultResponse,
          })}
        </Title1>

        <SpaceBetweenContainer>
          <Body>Senast uppdaterad {store.lastUpdated?.toLocaleTimeString()}</Body>
        </SpaceBetweenContainer>

        {draw && !isResult && (
          <CouponActionsContainer>
            <Checkbox
              name="showAnalysis"
              label="Visa spelanalyser"
              checked={showAnalysis}
              onChange={handleShowAnalysis}
            />
            <OutlinedButton Icon={Trash} onClick={clearCoupong}>
              Rensa kupong
            </OutlinedButton>
          </CouponActionsContainer>
        )}
      </Header>

      {events && (
        <Table
          couponType={store.couponType}
          initialsBets={bets}
          events={events}
          onBetClick={handleBetClick}
          showAnalysis={showAnalysis}
          gameAnalysis={store.gameAnalysis}
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

const CoupongFooterContainer = styled.div<{ padding?: boolean }>`
  display: flex;
  justify-content: flex-end;
  gap: ${(p) => p.theme.spacing.m};
  ${(p) => p.padding && `padding: ${p.theme.spacing.xs} ${p.theme.spacing.s}`};
`;
const CouponActionsContainer = styled(CoupongFooterContainer)`
  justify-content: space-between;
  margin-top: ${(p) => p.theme.spacing.xxl};
`;
