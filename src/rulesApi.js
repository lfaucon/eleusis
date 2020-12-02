export const isFigure = (card) => (card ? 'JQK'.includes(card[0]) : false);
export const isNumber = (card) =>
  card ? 'A234567891'.includes(card[0]) : false;
export const isRed = (card) =>
  card ? 'HD'.includes(card[card.length - 1]) : false;
export const isBlack = (card) =>
  card ? 'SC'.includes(card[card.length - 1]) : false;
export const getValue = (card) =>
  card ? 'ZA234567891JQK'.indexOf(card[0]) : 0;
export const getSymbol = (card) => (card ? card[card.length - 1] : '');
export const getLast = (s) => s[s.length - 1];
