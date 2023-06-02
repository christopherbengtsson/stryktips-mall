import { buildSvenskaSpelURL } from "./stryktipsUrl";
import { Bets } from "../stores/StorageService";

const baseBets: Bets = [
  {
    "1": "clicked",
    "2": "clicked",
    X: "unclicked",
  },
  {
    "1": "clicked",
    "2": "unclicked",
    X: "unclicked",
  },
  {
    "1": "clicked",
    "2": "unclicked",
    X: "unclicked",
  },
  {
    "1": "clicked",
    "2": "unclicked",
    X: "unclicked",
  },
  {
    "1": "clicked",
    "2": "unclicked",
    X: "unclicked",
  },
  {
    "1": "clicked",
    "2": "unclicked",
    X: "unclicked",
  },
  {
    "1": "clicked",
    "2": "unclicked",
    X: "unclicked",
  },
  {
    "1": "clicked",
    "2": "unclicked",
    X: "unclicked",
  },
  {
    "1": "clicked",
    "2": "unclicked",
    X: "unclicked",
  },
  {
    "1": "clicked",
    "2": "unclicked",
    X: "unclicked",
  },
  {
    "1": "clicked",
    "2": "unclicked",
    X: "unclicked",
  },
  {
    "1": "clicked",
    "2": "unclicked",
    X: "unclicked",
  },
];

describe("stryktipsUrl", () => {
  it("works with valid coupons", () => {
    const result = buildSvenskaSpelURL(
      123,
      [
        {
          "1": "clicked",
          "2": "clicked",
          X: "clicked",
        },
        ...baseBets,
      ],
      true
    );

    expect(result).toBe(
      "https://spela.svenskaspel.se/stryktipset?product=1&draw=123&signs=1%3A1%3BX%3B2%2C2%3A1%3B2%2C3%3A1%2C4%3A1%2C5%3A1%2C6%3A1%2C7%3A1%2C8%3A1%2C9%3A1%2C10%3A1%2C11%3A1%2C12%3A1%2C13%3A1&share=valid"
    );
  });

  it.only("works with invalid coupons", () => {
    const result = buildSvenskaSpelURL(
      123,
      [
        {
          "1": "unclicked",
          "2": "unclicked",
          X: "unclicked",
        },
        ...baseBets,
      ],
      false
    );

    expect(result).toBe(
      "https://spela.svenskaspel.se/stryktipset?product=1&draw=123&signs=1%3A1%3BX%3B2%2C2%3A1%3B2%2C4%3A1%2C5%3A1%2C6%3A1%2C7%3A1%2C8%3A1%2C9%3A1%2C10%3A1%2C11%3A1%2C12%3A1%2C13%3A1&share=invalid"
    );
  });
});
