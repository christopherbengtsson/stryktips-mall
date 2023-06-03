export const LayoutIdMap = {
  headerContainer: 'header-container',
  footerContainer: 'footer-container',
  scrollContainer: 'main-scroll-container',
  modalHeaderContainer: 'modal-header-container',
};

export const getScrollContainer = () => {
  return document.getElementById(LayoutIdMap.scrollContainer) as HTMLDivElement;
};

export const LayoutClassMap = {
  gradientActive: 'gradient-active',
};
