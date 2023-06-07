import { HEADER_TITLE_OFFSET } from '../core/Constants';
import { LayoutClassMap, LayoutIdMap } from './Constants';

// Some imperative code to avoid passing contexts around and rerendering everything on scroll
export const handleLayoutScroll = ({
  currentTarget: scrollContainer,
}: {
  currentTarget: HTMLDivElement | null;
}) => {
  if (!scrollContainer) return;

  // HTML Elements used: (caching doesn't provide any real perf benefit)
  const headerContainer = document.getElementById(LayoutIdMap.headerContainer)!;
  const footerContainer = document.getElementById(LayoutIdMap.footerContainer)!;

  const scrollTop = scrollContainer.scrollTop;
  const isTop = scrollTop < HEADER_TITLE_OFFSET / 2;
  if (isTop) {
    headerContainer.classList.remove(LayoutClassMap.gradientActive);
  } else {
    headerContainer.classList.add(LayoutClassMap.gradientActive);
  }
  const isBottom =
    Math.abs(
      scrollContainer.scrollHeight - scrollContainer.scrollTop - scrollContainer.clientHeight,
    ) <= 3.0;

  if (isBottom) {
    footerContainer.classList.remove(LayoutClassMap.gradientActive);
  } else {
    footerContainer.classList.add(LayoutClassMap.gradientActive);
  }
};
