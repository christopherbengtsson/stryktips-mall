import { SvenskaFolket } from '../../api';
import { Body } from '../core/fonts';

export function BaseStrategy({ peoplesOdds }: { peoplesOdds: SvenskaFolket }) {
  const procenttalOne: number = parseFloat(peoplesOdds.one);
  const procenttalX: number = parseFloat(peoplesOdds.x);
  const procenttalTwo: number = parseFloat(peoplesOdds.two);

  const One = () => {
    // För ettor
    if (procenttalOne >= 89) {
      return (
        <li>
          <Body>Spika 1</Body>
        </li>
      );
    } else if (procenttalOne <= 7) {
      return (
        <li>
          <Body>Tippa inte 1</Body>
        </li>
      );
    } else if (procenttalOne >= 65 && procenttalOne <= 83) {
      return (
        <li>
          <Body>Gardera 1</Body>
        </li>
      );
    } else if (procenttalOne >= 8 && procenttalOne <= 36) {
      return (
        <li>
          <Body>Lönsam 1</Body>
        </li>
      );
    } else {
      return null;
    }
  };

  const X = () => {
    // För kryss
    if (procenttalX <= 6) {
      return (
        <li>
          <Body>Tippa aldrig X</Body>
        </li>
      );
    } else if (procenttalX >= 7 && procenttalX <= 30) {
      return (
        <li>
          <Body>Lönsamt X</Body>
        </li>
      );
    } else {
      return null;
    }
  };

  const Two = () => {
    // För tvåor
    if (procenttalTwo >= 81) {
      return (
        <li>
          <Body>Spika 2</Body>
        </li>
      );
    } else if (procenttalTwo <= 6) {
      return (
        <li>
          <Body>Tippa inte 2</Body>
        </li>
      );
    } else if (procenttalTwo >= 55 && procenttalTwo <= 66) {
      return (
        <li>
          <Body>Gardera 2</Body>
        </li>
      );
    } else if ((procenttalTwo >= 7 && procenttalTwo <= 29) || procenttalTwo >= 90) {
      return (
        <li>
          <Body>Lönsam 2</Body>
        </li>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <One />
      <X />
      <Two />
    </>
  );
}
