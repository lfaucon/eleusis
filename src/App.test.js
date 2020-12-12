import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import rules from './rules';

it('App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

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
