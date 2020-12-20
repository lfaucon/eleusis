import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import rules from './rules';

// it('App renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

const pick = (a) => a[Math.floor(Math.random() * a.length)];
const cards = 'AC;AD;AH;AS;2C;2D;2H;2S;3C;3D;3H;3S;4C;4D;4H;4S;5C;5D;5H;5S;6C;6D;6H;6S;7C;7D;7H;7S;8C;8D;8H;8S;9C;9D;9H;9S;10C;10D;10H;10S;JC;JD;JH;JS;QC;QD;QH;QS;KC;KD;KH;KS'.split(
  ';',
);
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

it('All rules can be used without crashing', () => {
  [...rules.easy, ...rules.medium, ...rules.hard].forEach((r) => {
    console.log('Testing rule:');
    console.log(r);
    const rule = eval(r);
    for (var testGame = 0; testGame < 50; testGame++) {
      const history = [];
      for (var testCard = 0; testCard < 100; testCard++) {
        const newCard = pick(cards);
        const accepted = rule(newCard, history);
        if (rule(newCard, history) !== accepted)
          throw 'Output is not deterministic';
        if (accepted !== true && accepted !== false)
          throw 'Output is not a boolean';
        if (accepted === true) history.push(newCard);
      }
    }
  });
});
