import React, { useState } from 'react';
import firebase from 'firebase/app';

import './App.css';

var UNSUBSCRIBE_FIREBASE = null;
const startAutomaticUpdates = (gameId, setGame) => {
  const db = firebase.firestore();

  if (UNSUBSCRIBE_FIREBASE) UNSUBSCRIBE_FIREBASE();
  UNSUBSCRIBE_FIREBASE = db
    .collection('games')
    .doc(gameId)
    .onSnapshot(
      {
        // Listen for document metadata changes
        includeMetadataChanges: true,
      },
      function (doc) {
        console.log(doc.data());
        setGame(doc.data());
      },
    );
};

const computeScore = (p) => {
  return (Math.log(p) + Math.log(2)) / Math.log(2);
};

const cards = 'AC;AD;AH;AS;2C;2D;2H;2S;3C;3D;3H;3S;4C;4D;4H;4S;5C;5D;5H;5S;6C;6D;6H;6S;7C;7D;7H;7S;8C;8D;8H;8S;9C;9D;9H;9S;0C;0D;0H;0S;JC;JD;JH;JS;QC;QD;QH;QS;KC;KD;KH;KS'.split(
  ';',
);

const Header = ({ game, gameId }) => {
  const { players, master } = game;

  const resetGame = () => {
    const db = firebase.firestore();

    const databaseUpdate = {
      selected: '',
      master: '',
      players: [...players, master],
      statusSequence: [],
      cardSequence: [],
      turn: 0,
    };
    [...players, master].forEach((p) => {
      databaseUpdate['bet_' + p] = 0;
      databaseUpdate['score_' + p] = 0;
    });
    db.collection('games').doc(gameId).set(databaseUpdate, { merge: true });
  };

  return (
    <div className="title">
      <span id="title">Eleusis 2</span>
      <button onClick={resetGame}>reset</button>
    </div>
  );
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

const Table = ({ game, name, sequence }) => {
  const { selected, cardSequence, statusSequence, turn } = game;

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

const Bet = ({ name, gameId }) => {
  const [bet, setBet] = useState(null);

  return (
    <div>
      <div>Enter a bet:</div>
      <input type="number" onChange={(e) => setBet(e.target.value)} />
      <button
        onClick={() => {
          if (!bet || bet < 0.001 || bet > 0.999) {
            alert('You can only submit a bet between 0.001 and 0.999');
            return;
          }
          const db = firebase.firestore();
          db.collection('games')
            .doc(gameId)
            .set({ ['bet_' + name]: bet }, { merge: true });
        }}
      >
        Submit
      </button>
      {bet && <div>Score if card accepted: {computeScore(bet).toFixed(2)}</div>}
      {bet && (
        <div>Score if card rejected: {computeScore(1 - bet).toFixed(2)}</div>
      )}
    </div>
  );
};

const SidePanel = ({ game, name, gameId }) => {
  const { players, turn, selected, cardSequence, statusSequence } = game;

  const handleCard = (accepted) => {
    cardSequence.push(game.selected);
    statusSequence.push(accepted);
    const db = firebase.firestore();

    const databaseUpdate = {
      selected: '',
      statusSequence,
      cardSequence,
      turn: turn + 1,
    };

    players.forEach((p) => (databaseUpdate['bet_' + p] = 0));
    players.forEach(
      (p) =>
        (databaseUpdate['score_' + p] = firebase.firestore.FieldValue.increment(
          computeScore(accepted ? game['bet_' + p] : 1 - game['bet_' + p]),
        )),
    );
    db.collection('games').doc(gameId).set(databaseUpdate, { merge: true });
  };

  const mustBet = players.filter((p) => !game['bet_' + p]);

  return (
    <div id="sidepanel">
      <h3>Game Master: </h3>
      <div>{game.master}</div>
      <h3>Scores</h3>
      <table>
        <tbody>
          {players.map((p) => (
            <tr key={p}>
              <th>{p}</th>
              <th>{(game['score_' + p] || 0).toFixed(3)}</th>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Game Status</h3>
      {!selected && (
        <div>
          Waiting for {players[turn % players.length] || 'other players'} . . .
        </div>
      )}
      {selected && mustBet.includes(name) && (
        <Bet name={name} gameId={gameId} />
      )}
      {selected && mustBet.map((p) => <div>Waiting for {p} . . .</div>)}
      {name === game.master && mustBet.length === 0 && selected && (
        <div>
          <button onClick={() => handleCard(true)}>accept</button>
          <button onClick={() => handleCard(false)}>reject</button>
        </div>
      )}
    </div>
  );
};

const Deck = ({ game, sequence, name, gameId }) => {
  const { players, selected, cardSequence, statusSequence, turn } = game;

  const handlePlay = (card) => {
    const db = firebase.firestore();
    db.collection('games').doc(gameId).set({ selected: card }, { merge: true });
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

const NamePicker = ({ game, setName, gameId }) => {
  const [tempName, setTempName] = useState('');

  const handleNewName = () => {
    console.log(tempName);
    if (!tempName) return;
    if (game.players.includes(tempName) || game.master === tempName) {
      alert('This name is already taken');
      return;
    }
    setName(tempName);
    const db = firebase.firestore();
    db.collection('games')
      .doc(gameId)
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
      <p>Select or add your name:</p>
      {game.players.map((p) => (
        <button key={p} onClick={() => setName(p)}>
          {p}
        </button>
      ))}
      {game.master && (
        <button onClick={() => setName(game.master)}>{game.master}*</button>
      )}
      <div>
        <input
          placeholder="name"
          type="text"
          onChange={(e) => setTempName(e.target.value)}
        />
        <button onClick={handleNewName}>Submit</button>
      </div>
    </div>
  );
};

const MasterPicker = ({ game, name, gameId }) => {
  const [tempName, setTempName] = useState('');

  const becomeGameMaster = () => {
    const db = firebase.firestore();
    db.collection('games')
      .doc(gameId)
      .set(
        {
          master: name,
          players: game.players.filter((p) => p !== name),
        },
        { merge: true },
      );
  };

  return (
    <div className="picker">
      The game has no game master
      <br />
      <button onClick={becomeGameMaster}>Be the game master</button>
    </div>
  );
};

const GamePicker = ({ setGameId }) => {
  const [tempId, setTempId] = useState(0);

  const createGame = () => {
    const gameId = (10000 * Math.random()).toFixed(0);
    const db = firebase.firestore();
    db.collection('games').doc(gameId).set({
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
        <button onClick={() => setGameId(tempId)}>Join</button>
      </div>
      <span>Or create a game:</span>
      <button onClick={createGame}>Create game</button>
    </div>
  );
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
    window.history.replaceState(null, null, '?' + queryParams.toString());
    setGameId(g);
  };

  const _setName = (n) => {
    var queryParams = new URLSearchParams(window.location.search);
    queryParams.set('n', n);
    window.history.replaceState(null, null, '?' + queryParams.toString());
    setName(n);
  };

  if (!gameId) {
    return <GamePicker setGameId={_setGameId} />;
  }

  if (!game) {
    startAutomaticUpdates(gameId, setGame);
    return <div>loading . . .</div>;
  }

  const { players, cardSequence, statusSequence, turn } = game;
  const sequence = cardSequence.map((card, i) => ({
    card,
    accepted: statusSequence[i],
  }));

  if (!name) {
    return <NamePicker game={game} setName={_setName} gameId={gameId} />;
  }

  if (!game.master) {
    return <MasterPicker game={game} name={name} gameId={gameId} />;
  }

  return (
    <div className="App">
      <Header game={game} gameId={gameId} />
      <div id="tableContainer">
        <Table game={game} name={name} sequence={sequence} />
        <SidePanel game={game} name={name} gameId={gameId} />
      </div>
      <Deck game={game} name={name} sequence={sequence} gameId={gameId} />
    </div>
  );
};

export default App;
