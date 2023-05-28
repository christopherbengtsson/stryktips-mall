import { SvenskaFolket } from "../../api";

export function BaseStrategy({ peoplesOdds }: { peoplesOdds: SvenskaFolket }) {
  const procenttalOne: number = parseFloat(peoplesOdds.one);
  const procenttalX: number = parseFloat(peoplesOdds.x);
  const procenttalTwo: number = parseFloat(peoplesOdds.two);

  const One = () => {
    // För ettor
    if (procenttalOne >= 89) {
      return <li>Spika 1</li>;
    } else if (procenttalOne <= 7) {
      return <li>Tippa inte 1</li>;
    } else if (procenttalOne >= 65 && procenttalOne <= 83) {
      return <li>Gardera 1</li>;
    } else if (procenttalOne >= 8 && procenttalOne <= 36) {
      return <li>Bra utdelning på 1</li>;
    } else {
      return null;
    }
  };

  const X = () => {
    // För kryss
    if (procenttalX <= 6) {
      return <li>Tippa aldrig X</li>;
    } else if (procenttalX >= 7 && procenttalX <= 30) {
      return <li>Bra utdelning på X</li>;
    } else {
      return null;
    }
  };

  const Two = () => {
    // För tvåor
    if (procenttalTwo >= 81) {
      return <li>Spika 2</li>;
    } else if (procenttalTwo <= 6) {
      return <li>Tippa inte 2</li>;
    } else if (procenttalTwo >= 55 && procenttalTwo <= 66) {
      return <li>Gardera 2</li>;
    } else if (
      (procenttalTwo >= 7 && procenttalTwo <= 29) ||
      procenttalTwo >= 90
    ) {
      return <li>Bra utdelning på 2</li>;
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
