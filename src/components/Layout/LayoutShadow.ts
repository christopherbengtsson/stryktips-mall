import { css } from 'styled-components';
import { LayoutClassMap } from './Constants';

export const HeaderShadow = css`
  /* Shadow */
  &:after {
    content: '';
    width: 100%;
    height: 7px;

    position: absolute;
    bottom: -7px;
    left: 0;

    transition: opacity 0.15s ease-in-out;
    opacity: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.07), rgba(0, 0, 0, 0));
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
    height: 7px;

    position: absolute;
    top: -7px;
    left: 0;

    background: linear-gradient(to top, rgba(0, 0, 0, 0.07), rgba(0, 0, 0, 0));
    opacity: 0;
    transition: opacity 0.15s ease-in-out;
  }
  &.${LayoutClassMap.gradientActive} {
    &:before {
      opacity: 1;
    }
  }
`;
