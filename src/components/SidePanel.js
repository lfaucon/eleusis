import React, { useState } from 'react';
import firebase from 'firebase/app';

import ScoreBoard from './ScoreBoard';

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
      {selected && mustBet.map((p) => <Waiting who={p} key={p} />)}
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
    </div>
  );
};

export default SidePanel;
