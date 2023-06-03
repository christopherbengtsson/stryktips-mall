import { css } from 'styled-components';
import { LayoutClassMap } from './Constants';

export const HeaderShadow = css`
  /* Shadow */
  &:after {
    content: '';
    width: 100%;
    height: 1px;

    position: absolute;
    bottom: -1px;
    left: 0;

    transition: opacity 0.15s ease-in-out;
    opacity: 0;
    background: ${(p) => p.theme.tokens.palette.concreteSuperLight};
  }
  &.${LayoutClassMap.gradientActive} {
    &:after {
      opacity: 1;
    }
  }
`;

export const FooterShadow = css`
  &:before {
    content: '';
    width: 100%;
    height: 1px;

    position: absolute;
    top: -1px;
    left: 0;

    background: ${(p) => p.theme.tokens.palette.concreteSuperLight};
    opacity: 0;
    transition: opacity 0.15s ease-in-out;
  }
  &.${LayoutClassMap.gradientActive} {
    &:before {
      opacity: 1;
    }
  }
`;
