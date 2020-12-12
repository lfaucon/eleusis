import React from 'react';
import firebase from 'firebase/app';

const Header = ({ game, name }) => {
  const { players, leader, ended } = game;

  const resetGame = () => {
    const db = firebase.firestore();

    const databaseUpdate = {
      selected: '',
      master: '',
      rule: '',
      leader: '',
      gameType: '',
      statusSequence: [],
      cardSequence: [],
      ended: false,
    };
    players.forEach((p) => {
      databaseUpdate['bet_' + p] = 0;
      databaseUpdate['score_' + p] = 0;
      databaseUpdate['total_' + p] = 0;
    });
    db.collection('games').doc(game.id).set(databaseUpdate, { merge: true });
  };

  const revealGame = () => {
    const db = firebase.firestore();
    db.collection('games').doc(game.id).set({ ended: true }, { merge: true });
  };

  return (
    <div className="title">
      <span id="title">Eleusis 2</span>
      {leader === name && !ended && (
        <button onClick={revealGame}>Reveal Rule</button>
      )}
      {ended && <button onClick={resetGame}>Reset</button>}
    </div>
  );
};

export default Header;
