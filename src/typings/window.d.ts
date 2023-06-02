import { MainStore } from "../stores/MainStore";

export {};
declare global {
  const pkgJson: { version: string };
  const host: string;

  interface Window {
    store?: MainStore;
  }
}
