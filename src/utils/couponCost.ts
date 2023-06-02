import { Bets } from "../stores/StorageService";

export function calculateCost(data: Bets) {
  const costPerBet = 1;

  let totalCost = 0;

  for (const item of data) {
    let garderingar = 0;

    Object.values(item).forEach((bet) => {
      if (bet === "clicked") {
        garderingar += 1;
      }
    });

    switch (garderingar) {
      case 2:
        totalCost *= 2;
        break;

      case 3:
        totalCost *= 3;
        break;
    }

    if (totalCost === 0) {
      totalCost = costPerBet * garderingar;
    }
  }

  return totalCost;
}
