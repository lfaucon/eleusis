import React from 'react';

const ScoreBoard = ({ game }) => {
  const players = game.players.filter((p) => p !== game.master);

  return (
    <div>
      <h3>Scores</h3>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Latest</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p) => (
            <tr key={p}>
              <th>{p}</th>
              <th>{(game['score_' + p] || 0).toFixed(2)}</th>
              <th>{(game['total_' + p] || 0).toFixed(2)}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreBoard;
