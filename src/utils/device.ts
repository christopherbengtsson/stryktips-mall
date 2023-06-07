import UAParser from 'ua-parser-js';

export function createParser() {
  return new UAParser(navigator.userAgent);
}

export function isMobile() {
  return createParser().getDevice().type === 'mobile';
}
