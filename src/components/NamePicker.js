import React, { useState } from 'react';
import firebase from 'firebase/app';

const NamePicker = ({ game, setName }) => {
  const [tempName, setTempName] = useState('');

  const handleNewName = () => {
    if (!tempName) return;
    if (game.players.includes(tempName) || game.master === tempName) {
      alert('This name is already taken');
      return;
    }
    setName(tempName);
    const db = firebase.firestore();
    db.collection('games')
      .doc(game.id)
      .set(
        {
          players: [...game.players, tempName],
        },
        { merge: true },
      );
  };

  return (
    <div className="picker">
      <p>Share this page URL to invite friends</p>
      <span>
        You can play alone if on the next screen you select the option to let
        Eleusis' Robot be the game master.
      </span>
      <p>Select or add your name:</p>
      {game.players.map((p) => (
        <button key={p} onClick={() => setName(p)}>
          {p}
        </button>
      ))}
      <div class="inputContainer">
        <input
          placeholder="Add name"
          type="text"
          onChange={(e) => setTempName(e.target.value)}
        />
        <button onClick={handleNewName} disabled={!tempName}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default NamePicker;
