import { Bets } from '../stores/StorageService';

export function calculateCost(data: Bets) {
  const costPerBet = 1;

  let totalCost = 0;
  let totalCostIndetermined = 0;

  for (const item of data) {
    let garderingar = 0;
    let indetermined = 0;

    Object.values(item).forEach((bet) => {
      if (bet === 'clicked') {
        garderingar += 1;
        indetermined += 1;
      }
      if (bet === 'indeterminate') {
        indetermined += 1;
      }
    });

    totalCost = multiplyCost(totalCost, garderingar);
    totalCostIndetermined = multiplyCost(totalCostIndetermined, indetermined);

    if (totalCost === 0) {
      totalCost = costPerBet * garderingar;
    }
    if (totalCostIndetermined === 0) {
      totalCostIndetermined = costPerBet * indetermined;
    }
  }

  return { totalCost, totalCostIndetermined };
}

const multiplyCost = (cost: number, garderingar: number) => {
  if (garderingar === 2 || garderingar === 3) {
    return (cost *= garderingar);
  }
  return cost;
};
