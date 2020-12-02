import React from 'react';
import firebase from 'firebase/app';

const cards = 'AC;AD;AH;AS;2C;2D;2H;2S;3C;3D;3H;3S;4C;4D;4H;4S;5C;5D;5H;5S;6C;6D;6H;6S;7C;7D;7H;7S;8C;8D;8H;8S;9C;9D;9H;9S;10C;10D;10H;10S;JC;JD;JH;JS;QC;QD;QH;QS;KC;KD;KH;KS'.split(
  ';',
);

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

const Deck = ({ game, sequence, name }) => {
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

export default Deck;
