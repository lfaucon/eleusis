import React, { useState } from 'react';
import firebase from 'firebase/app';

import ScoreBoard from './ScoreBoard';

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
    <div>
      <div>Enter a bet:</div>
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
        type="number"
        value={bet / 1000}
        onChange={(e) => setBet(1000 * e.target.value)}
      />
      <div>Score if card accepted: {computeScore(bet / 1000).toFixed(2)}</div>
      <div>
        Score if card rejected: {computeScore(1 - bet / 1000).toFixed(2)}
      </div>
      {bet > 699 && (
        <div>
          You think the card will likely be <b>ACCEPTED</b>
        </div>
      )}
      {bet < 301 && (
        <div>
          You think the card will likely be <b>REJECTED</b>
        </div>
      )}
      <button onClick={submitBet}>Submit</button>
    </div>
  );
};

const ActionSelect = () => {
  return <div>Select a card below</div>;
};

const ActionRule = ({ game, name, logger }) => {
  const { turn, cardSequence, statusSequence, selected } = game;
  const players = game.players.filter((p) => p !== game.master);

  const handleRule = (accepted) => {
    cardSequence.push(selected);
    statusSequence.push(accepted);

    logger({ accepted });

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
    <div>
      <button onClick={() => handleRule(true)}>accept</button>
      <button onClick={() => handleRule(false)}>reject</button>
    </div>
  );
};

const Action = ({ game, name, logger }) => {
  const { turn, selected } = game;
  const players = game.players.filter((p) => p !== game.master);
  const mustBet = players.filter((p) => !game['bet_' + p]);

  var action = null;
  if (selected && mustBet.length === 0 && name === game.leader)
    action = <ActionRule game={game} logger={logger} />;
  if (selected && mustBet.includes(name))
    action = <ActionBet game={game} name={name} logger={logger} />;
  if (!selected && players[turn % players.length] === name)
    action = <ActionSelect game={game} />;
  if (action)
    return (
      <div>
        <h3>Action</h3>
        {action}
      </div>
    );
  return null;
};

const Status = ({ game, name }) => {
  const { turn, selected } = game;
  const players = game.players.filter((p) => p !== game.master);
  const mustBet = players.filter((p) => !game['bet_' + p]);
  // TODO: finish and test feature to kick players
  // const isLeader = game.leader === name;
  const isLeader = false;

  const Waiting = ({ who }) => {
    const kick = () => {
      const db = firebase.firestore();
      db.collection('games')
        .doc(game.id)
        .set(
          { players: game.players.filter((p) => p != who) },
          { merge: true },
        );
    };

    return (
      <div>
        Waiting for {who} . . . {isLeader && <button>kick</button>}
      </div>
    );
  };

  return (
    <div>
      <h3>Game Status</h3>
      {selected && mustBet.map((p) => <Waiting who={game.master} key={p} />)}
      {selected && mustBet.length === 0 && <Waiting who={game.master} />}
      {!selected && (
        <Waiting who={players[turn % players.length] || 'other players'} />
      )}
    </div>
  );
};

const SidePanel = ({ game, name, logger }) => {
  const { ended } = game;
  return (
    <div id="sidepanel">
      <span>
        <b>Game master:</b> {game.master}
      </span>
      <ScoreBoard game={game} />
      {!ended && <Status game={game} name={name} />}
      {!ended && <Action game={game} name={name} logger={logger} />}
    </div>
  );
};

export default SidePanel;
