import React, { useState } from 'react';
import firebase from 'firebase/app';
import { generateId, getDataPreference } from '../utils';

const GamePicker = ({ setGameId, logger }) => {
  const [tempId, setTempId] = useState(null);

  const [preference, setPreference] = useState(getDataPreference());

  const retractFromScience = () => {
    if (preference === 'OK') {
      window.localStorage.setItem('eleusisDataPreference', 'RETRACTED');
      setPreference('RETRACTED');
      alert('You have withdrawn from anonymous data collection');
    } else {
      window.localStorage.setItem('eleusisDataPreference', 'OK');
      setPreference('OK');
    }
  };

  const createGame = () => {
    const gameId = generateId(6);
    logger({ create: gameId });
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
      <span className="warning">
        Multiplayer features might be temporarily unavailable because of too
        much demand on our database. You can still play the game individually by
        letting Eleusis choose the rules. <br /> Sorry for the inconvenience.
      </span>
      <span>Join a game:</span>
      <div className="inputContainer">
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
      {preference === 'OK' && (
        <span className="disclaimer">
          Interaction with the game is anonymously recorded for the benefit of
          science. <br />
          Click <u onClick={retractFromScience}>here</u> to withdraw from the
          data collection.
        </span>
      )}
      {preference === 'RETRACTED' && (
        <span className="disclaimer">
          You have chosen to not share your data anonymously.
          <br />
          Click <u onClick={retractFromScience}>here</u> to decide to share your
          data again.
        </span>
      )}
    </div>
  );
};

export default GamePicker;
