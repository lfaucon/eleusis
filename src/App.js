import React, { useState } from 'react';
import firebase from 'firebase/app';

import './App.css';

import Deck from './components/Deck';
import SidePanel from './components/SidePanel';
import MasterPicker from './components/MasterPicker';
import GamePicker from './components/GamePicker';
import NamePicker from './components/NamePicker';
import Header from './components/Header';

var UNSUBSCRIBE_FIREBASE = null;
const startAutomaticUpdates = (gameId, setGame) => {
  const db = firebase.firestore();

  if (UNSUBSCRIBE_FIREBASE) UNSUBSCRIBE_FIREBASE();
  UNSUBSCRIBE_FIREBASE = db
    .collection('games')
    .doc(gameId)
    .onSnapshot(
      {
        includeMetadataChanges: false,
      },
      (doc) => setGame(doc.data()),
    );
};

const Table = ({ game, name, sequence }) => {
  const { selected } = game;

  const style = {
    top: 0,
    left: 8,
    marginTop: 15,
  };
  return (
    <div id="table">
      {sequence &&
        sequence.map(({ card, accepted }, i) => {
          if (accepted) {
            style.top = 0;
            style.left = style.left + 128;
            style.marginTop = 15;
          } else {
            style.top = 150;
            style.marginTop = style.marginTop + 42;
          }
          return (
            <img
              key={card + i}
              src={'cards/' + card + '.png'}
              style={{ ...style }}
              className="card"
              alt={'card ' + card}
            />
          );
        })}

      {selected && (
        <img
          src={'cards/' + selected + '.png'}
          style={{ top: 0, left: style.left + 256, marginTop: 15 }}
          className="card selected"
          alt={'card ' + selected}
        />
      )}

      {selected && (
        <span
          style={{
            top: 40,
            left: style.left + 278,
            color: '#f00b',
            fontSize: '120px',
            position: 'absolute',
          }}
        >
          ?
        </span>
      )}
      <div
        style={{
          top: -14,
          left: style.left + 600,
          position: 'absolute',
        }}
      >
        ...
      </div>
    </div>
  );
};

window.onpopstate = function (event) {
  if (event) {
    window.location.reload();
  }
};

const App = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const [gameId, setGameId] = useState(urlParams.get('g'));
  const [name, setName] = useState(urlParams.get('n'));
  const [game, setGame] = useState(null);

  const _setGameId = (g) => {
    var queryParams = new URLSearchParams(window.location.search);
    queryParams.set('g', g);
    window.history.pushState(null, null, '?' + queryParams.toString());
    setGameId(g);
  };

  const _setName = (n) => {
    var queryParams = new URLSearchParams(window.location.search);
    queryParams.set('n', n);
    window.history.pushState(null, null, '?' + queryParams.toString());
    setName(n);
  };

  if (!gameId) {
    return <GamePicker setGameId={_setGameId} />;
  }

  if (!game) {
    startAutomaticUpdates(gameId, setGame);
    return <div>loading . . .</div>;
  }

  const { cardSequence, statusSequence } = game;
  const sequence = cardSequence.map((card, i) => ({
    card,
    accepted: statusSequence[i],
  }));

  if (!name) {
    return <NamePicker game={game} setName={_setName} />;
  }

  if (!game.master) {
    return <MasterPicker game={game} name={name} />;
  }

  return (
    <div className="App">
      <Header game={game} name={name} />
      <div id="tableContainer">
        <Table game={game} name={name} sequence={sequence} />
        <SidePanel game={game} name={name} />
      </div>
      {!game.ended ? (
        <Deck game={game} name={name} sequence={sequence} />
      ) : (
        <div id="input">
          <textarea
            value={game.rule}
            disabled={true}
            style={{
              resize: 'none',
              width: 'calc(100% - 12px)',
              height: 'calc(100% - 12px)',
              fontSize: '16px',
              background: 'white',
              color: 'black',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default App;
