import React, { useState } from 'react';
import firebase from 'firebase/app';

import rules from '../rules';

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

const cards = 'AC;AD;AH;AS;2C;2D;2H;2S;3C;3D;3H;3S;4C;4D;4H;4S;5C;5D;5H;5S;6C;6D;6H;6S;7C;7D;7H;7S;8C;8D;8H;8S;9C;9D;9H;9S;10C;10D;10H;10S;JC;JD;JH;JS;QC;QD;QH;QS;KC;KD;KH;KS'.split(
  ';',
);
const pick = (a) => a[Math.floor(Math.random() * a.length)];

const RobotRulePicker = ({ setRule }) => {
  const handleChoice = (e) => {
    if (e.target.value === 'easy') setRule(pick(rules.easy));
    else if (e.target.value === 'medium')
      setRule(pick([...rules.easy, ...rules.medium, ...rules.medium]));
    else if (e.target.value === 'hard') {
      setRule(
        pick([
          ...rules.easy,
          ...rules.medium,
          ...rules.medium,
          ...rules.hard,
          ...rules.hard,
          ...rules.hard,
        ]),
      );
    } else setRule(null);
  };

  return (
    <select onChange={handleChoice}>
      <option value="">Select a difficulty</option>
      <option value="easy">Easy (only depending on the current card)</option>
      <option value="medium">
        Medium (depending on the current card and the latest accepted cards)
      </option>
      <option value="hard">
        Hard (depending on the current card and the whole history of accepted
        cards)
      </option>
    </select>
  );
};

const HumanRulePicker = ({ setRule }) => {
  return (
    <div>
      <p>
        Specify your rule with one or a few short sentences. You will have to
        accept or reject cards manually
      </p>
      <textarea
        placeholder=""
        rows="4"
        cols="50"
        onChange={(e) => setRule(e.target.value)}
      />
    </div>
  );
};

const GeekRulePicker = ({ setRule }) => {
  const [tempRule, setTempRule] = useState(
    '//Accept all cards\n(card, history) => true',
  );
  const [testOutput, setTestOutput] = useState(null);

  const loadExample = () => {
    setTempRule(pick([...rules.easy, ...rules.medium, ...rules.hard]));
    setRule(null);
  };

  const testRule = (r) => {
    const rule = eval(r);
    var acceptedCount = 0;
    for (var testGame = 0; testGame < 20; testGame++) {
      const history = [];
      for (var testCard = 0; testCard < 50; testCard++) {
        const newCard = pick(cards);

        try {
          const accepted = rule(newCard, history);
          if (rule(newCard, history) !== accepted)
            throw 'Output is not deterministic';
          if (accepted !== true && accepted !== false)
            throw 'Output is not a boolean';
          if (accepted === true) history.push(newCard);
        } catch (err) {
          console.log(err);
          alert(err);
          return;
        }
      }
      acceptedCount += history.length;
    }
    setTestOutput(
      `Out of 20 simulated games with 50 random cards each, ${acceptedCount} cards were accepted and ${
        1000 - acceptedCount
      } rejected`,
    );
    setRule(r);
  };

  return (
    <React.Fragment>
      <p>Specify your rule by implementing a JavaScript function.</p>
      <p className="doc">
        The function must be of type signature:
        <br />
        <span className="code">
          (card: string, history: Array(string) => Boolean
        </span>
        <br />
        You can use the helper functions: <br />
        <span className="code">isRed</span>,{' '}
        <span className="code">isBlack</span>,{' '}
        <span className="code">isFigure</span>,{' '}
        <span className="code">isNumber</span>,{' '}
        <span className="code">getValue</span>,{' '}
        <span className="code">getSymbol</span>, and{' '}
        <span className="code">getLast</span>.
        <br />
        Symbols are: <span className="code">"H"</span>,{' '}
        <span className="code">"C"</span>, <span className="code">"S"</span>,{' '}
        <span className="code">"D"</span>.<br />
        Values are numbers from 1 to 13.
        <br />
        Look at a few examples to have a better idea how to implement your rule
        and test your rule before starting the game.
      </p>
      <textarea
        className="code"
        rows="4"
        cols="50"
        value={tempRule}
        onChange={(e) => setTempRule(e.target.value)}
      />
      <button onClick={loadExample}>Load Example</button>
      <span className="doc">
        Test your rule with randomly generated sequences of cards, then start
        the game if it seems to work as intended
      </span>
      <button onClick={() => testRule(tempRule)}>Test Rule</button>
      <span className="doc">{testOutput}</span>
    </React.Fragment>
  );
};

const MasterPicker = ({ game, name, logger }) => {
  const [gameType, setGameType] = useState(null);
  const [rule, setRule] = useState(null);

  const startGame = () => {
    const db = firebase.firestore();
    const master = gameType === 'robot' ? 'Talos 6.0' : name;
    logger({ master, rule, gameType, leader: name });
    db.collection('games')
      .doc(game.id)
      .set({ master, rule, gameType, leader: name }, { merge: true });
  };

  return (
    <div className="picker">
      <span>
        Agree with your friends on who should be the Game Master. Only the Game
        Master should click "Start Game" below.
      </span>
      <br />
      <select onChange={(e) => setGameType(e.target.value)}>
        <option value="">Choose how to specify the rule</option>
        <option value="robot">Let Eleusis' Robot choose the rule</option>
        <option value="geek">Specify a rule with code</option>
        <option value="human">Specify a rule without code</option>
      </select>
      {gameType === 'robot' && <RobotRulePicker setRule={setRule} />}
      {gameType === 'human' && <HumanRulePicker setRule={setRule} />}
      {gameType === 'geek' && <GeekRulePicker setRule={setRule} />}
      <button onClick={startGame} disabled={!rule || !gameType}>
        Start Game
      </button>
    </div>
  );
};

export default MasterPicker;
