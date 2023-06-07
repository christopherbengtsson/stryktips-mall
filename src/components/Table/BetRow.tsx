import styled from 'styled-components';
import { DrawEvent, FavouriteOdds, Odds, SvenskaFolket } from '../../api';
import { Body } from '../core/fonts';
import { Tag } from '../Tag';
import { BaseStrategy } from '../BaseStrategy';
import { oddsValue, transformData } from '../../utils/transformers';

export type OddsLabel = 'Odds' | 'Svenska folket' | 'Favoritskap' | 'Odds i procent';
export type OddsType = Odds | SvenskaFolket | FavouriteOdds;

export function BetRow({
  title,
  odds,
}:
  | {
      title: OddsLabel;
      odds?: OddsType;
    }
  | {
      title: 'Spelvärde' | 'Utgångspunkt';
      odds: DrawEvent;
    }) {
  return (
    <BetRowContainer>
      <Body>{title}</Body>
      <BetValues justifyStart={title === 'Utgångspunkt'}>
        {title === 'Spelvärde' ? (
          <>
            <Tag value={oddsValue(odds.odds?.one, odds.svenskaFolket.one)} />
            <Tag value={oddsValue(odds.odds?.x, odds.svenskaFolket.x)} />
            <Tag value={oddsValue(odds.odds?.two, odds.svenskaFolket.two)} />
          </>
        ) : title === 'Utgångspunkt' ? (
          <ul>
            <BaseStrategy peoplesOdds={odds.svenskaFolket} />
          </ul>
        ) : (
          <>
            <Body>{transformData(title, (odds as OddsType)?.one)}</Body>
            <Body>{transformData(title, (odds as OddsType)?.x)}</Body>
            <Body>{transformData(title, (odds as OddsType)?.two)}</Body>
          </>
        )}
      </BetValues>
    </BetRowContainer>
  );
}

const BetRowContainer = styled.div`
  display: grid;
  grid-template-columns: auto minmax(150px, 30%);
  grid-template-areas: 'title stats';
  margin-top: ${(p) => p.theme.spacing.tiny};
  align-items: center;
  padding: ${(p) => p.theme.spacing.tiny} 0;
  border-bottom: 1px dashed #86848c;

  ${(p) => p.theme.screens.small} {
    grid-template-columns: auto minmax(102px, 30%);
  }
`;

const BetValues = styled.div<{ justifyStart?: boolean }>`
  grid-area: stats;
  display: flex;
  gap: ${(p) => p.theme.spacing.s};
  justify-self: end;
  width: 100%;
  justify-content: space-around;

  ${(p) => p.justifyStart && 'justify-content: start;'}

  ${(p) => p.theme.screens.small} {
    gap: ${(p) => p.theme.spacing.xs};
  }
`;
