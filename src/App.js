import React, { useState } from 'react';
import firebase from 'firebase/app';

import './App.css';

import Controls from './components/Controls';
import SidePanel from './components/SidePanel';
import MasterPicker from './components/MasterPicker';
import GamePicker from './components/GamePicker';
import NamePicker from './components/NamePicker';
import Header from './components/Header';
import { getSecretCookie, getDataPreference } from './utils';

const cookie = getSecretCookie();

var DB_ERROR_TIMEOUT = null;
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
      <span
        style={{
          position: 'absolute',
          top: 183,
          borderBottom: '2px solid black',
          width: sequence.length * 128 + 700,
          minWidth: '100%',
          zIndex: 0,
        }}
      >
        Accepted
      </span>
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
          style={{ top: 0, left: style.left + 300, marginTop: 110 }}
          className="card selected"
          alt={'card ' + selected}
        />
      )}

      {selected && (
        <span
          style={{
            marginTop: 135,
            left: style.left + 232,
            color: '#020',
            fontSize: '120px',
            position: 'absolute',
          }}
        >
          ?
        </span>
      )}
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
  const [showSidePanel, setShowSidePanel] = useState(true);
  const [dbError, setDbError] = useState(false);

  const logger = (payload) => {
    if (getDataPreference() === 'RETRACTED') return;
    const db = firebase.firestore();
    const { cardSequence, statusSequence, id, selected } = game || {};
    const gameInfo = game
      ? { id, cardSequence, statusSequence, name, selected }
      : {};
    db.collection('logs').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      payload,
      gameInfo,
      cookie,
    });
  };

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
    return <GamePicker setGameId={_setGameId} logger={logger} />;
  }

  if (dbError) {
    return (
      <div className="picker">
        <span className="warning">
          Either you entered an incorrect Game ID or Multiplayer features might
          be temporarily unavailable because of too much demand on our database.
          You can still play the game individually by letting Eleusis choose the
          rules. <br /> Sorry for the inconvenience.
        </span>
        <a href="/">Go Back</a>
      </div>
    );
  }

  if (!game) {
    if (DB_ERROR_TIMEOUT) clearTimeout(DB_ERROR_TIMEOUT);
    DB_ERROR_TIMEOUT = setTimeout(() => {
      setDbError(true);
    }, 5000);
    startAutomaticUpdates(gameId, (x) => {
      if (x && DB_ERROR_TIMEOUT) clearTimeout(DB_ERROR_TIMEOUT);
      setGame(x);
    });
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
    return <MasterPicker game={game} name={name} logger={logger} />;
  }

  return (
    <div className="App">
      <Header game={game} name={name} />
      <div id="tableContainer">
        <Table game={game} name={name} sequence={sequence} />
        {showSidePanel && <SidePanel game={game} name={name} logger={logger} />}
        <button
          id="sidePanelToggle"
          onClick={() => setShowSidePanel(!showSidePanel)}
        >
          {showSidePanel ? 'hide info' : 'show info'}
        </button>
      </div>
      {!game.ended ? (
        <Controls game={game} name={name} sequence={sequence} logger={logger} />
      ) : (
        <div id="input">
          <textarea id="displayRule" value={game.rule} disabled={true} />
        </div>
      )}
    </div>
  );
};

export default App;
