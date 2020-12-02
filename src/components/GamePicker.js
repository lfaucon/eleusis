import React, { useState } from 'react';
import firebase from 'firebase/app';

const alphabet = 'QWERTZUIOPLKJHGFDSAYXCVBNM1234567890';
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const generateId = (n) => (n > 0 ? pick(alphabet) + generateId(n - 1) : '');

const GamePicker = ({ setGameId }) => {
  const [tempId, setTempId] = useState(null);

  const createGame = () => {
    const gameId = generateId(6);
    const db = firebase.firestore();
    db.collection('games').doc(gameId).set({
      id: gameId,
      selected: '',
      master: '',
      players: [],
      statusSequence: [],
      cardSequence: [],
      turn: 0,
    });
    setGameId(gameId);
  };

  return (
    <div className="picker">
      <h1>ELEUSIS 2</h1>
      <h2>Welcome!</h2>
      <span>Join a game:</span>
      <div>
        <input
          type="text"
          placeholder="Game ID"
          onChange={(e) => setTempId(e.target.value)}
        />
        <button onClick={() => setGameId(tempId)} disabled={!tempId}>
          Join
        </button>
      </div>
      <span>Or create a game:</span>
      <button onClick={createGame}>Create game</button>
    </div>
  );
};

export default GamePicker;
