import React, { useState } from 'react';
import firebase from 'firebase/app';

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

const computeScore = (p) => {
  return (Math.log(p) + Math.log(2)) / Math.log(2);
};

const computeRejectedCards = (sequence) => {
  var rejectedCards = [];
  sequence.forEach((c) => {
    if (c.accepted) {
      rejectedCards = [];
    } else {
      rejectedCards.push(c.card);
    }
  });
  return rejectedCards;
};

const ActionSelect = ({ game, sequence, name }) => {
  const { selected, turn } = game;
  const players = game.players.filter((p) => p !== game.master);

  const handlePlay = (card) => {
    const db = firebase.firestore();
    db.collection('games')
      .doc(game.id)
      .set({ selected: card }, { merge: true });
  };

  const rejectedCards = computeRejectedCards(sequence);

  return (
    <div id="input">
      {!selected &&
        name === players[turn % players.length] &&
        cards
          .filter((x) => !rejectedCards.includes(x))
          .map((card, i) => {
            return (
              <img
                key={card + i}
                src={'cards/' + card + '.png'}
                className="card input"
                style={{ left: 42 * i }}
                onClick={() => handlePlay(card)}
                alt={'card ' + card}
              />
            );
          })}
    </div>
  );
};

const ActionBet = ({ name, game, logger }) => {
  const [bet, setBet] = useState(500);

  const submitBet = () => {
    if (!bet || bet < 1 || bet > 999) {
      alert('You can only submit a bet between 0.001 and 0.999');
      return;
    }
    logger({ bet: bet / 1000 });
    const db = firebase.firestore();
    db.collection('games')
      .doc(game.id)
      .set({ ['bet_' + name]: bet / 1000 }, { merge: true });
  };

  return (
    <div id="input">
      <div className="betContainer">
        <div className="betInput">
          <input
            type="range"
            min="1"
            max="999"
            value={bet}
            className="slider"
            id="myRange"
            onChange={(e) => setBet(e.target.value)}
          />
          <input
            style={{ width: '42px' }}
            type="number"
            value={bet / 1000}
            onChange={(e) => setBet(1000 * e.target.value)}
          />
        </div>
        <div className="betInput">
          <span>
            If rejected: {bet < 500 && '+'}
            {computeScore(1 - bet / 1000).toFixed(2)}
          </span>
          <span>
            If accepted: {bet > 500 && '+'}
            {computeScore(bet / 1000).toFixed(2)}
          </span>
        </div>
        <div className="betInput">
          {bet > 599 && (
            <span>
              You think the card will likely be <b>ACCEPTED</b>
            </span>
          )}
          {bet < 401 && (
            <span>
              You think the card will likely be <b>REJECTED</b>
            </span>
          )}
        </div>
        <button onClick={submitBet}>Bet !</button>
      </div>
    </div>
  );
};

const ActionRule = ({ game, name, logger }) => {
  const { turn, cardSequence, statusSequence, selected } = game;
  const players = game.players.filter((p) => p !== game.master);

  const handleRule = (accepted) => {
    cardSequence.push(selected);
    statusSequence.push(accepted);

    //logger({ accepted });

    const db = firebase.firestore();

    const databaseUpdate = {
      selected: '',
      statusSequence,
      cardSequence,
      turn: turn + 1,
    };
    players.forEach((p) => {
      const score = computeScore(
        accepted ? game['bet_' + p] : 1 - game['bet_' + p],
      );
      databaseUpdate['bet_' + p] = 0;
      databaseUpdate['score_' + p] = score;
      databaseUpdate['total_' + p] = firebase.firestore.FieldValue.increment(
        score,
      );
    });
    db.collection('games').doc(game.id).set(databaseUpdate, { merge: true });
  };

  if (game.gameType !== 'human') {
    const rule = eval(game.rule);
    const accepted = rule(
      selected,
      cardSequence.filter((_, i) => statusSequence[i]),
    );
    handleRule(accepted);
    return <div>Automatically applying the rule . . .</div>;
  }

  return (
    <div id="input">
      <button onClick={() => handleRule(true)}>Accept</button>
      <button onClick={() => handleRule(false)}>Reject</button>
    </div>
  );
};

const Controls = ({ game, name, logger, sequence }) => {
  const { turn, selected } = game;
  const players = game.players.filter((p) => p !== game.master);
  const mustBet = players.filter((p) => !game['bet_' + p]);

  var action = null;
  if (selected && mustBet.length === 0 && name === game.leader)
    action = <ActionRule game={game} logger={logger} />;
  if (selected && mustBet.includes(name))
    action = <ActionBet game={game} name={name} logger={logger} />;
  if (!selected && players[turn % players.length] === name)
    action = <ActionSelect game={game} name={name} sequence={sequence} />;
  if (action) return action;
  return <div id="input"></div>;
};

export default Controls;
