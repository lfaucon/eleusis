import React, { Component } from "react";
import "./App.css";

import rules from "./rules";
import parser from "./parser";

const isFigure = card => "JQK".includes(card[0]);
const isPrime = card => "2357JK".includes(card[0]);
const isRed = card => "HD".includes(card[1]);
const isBlack = card => "SC".includes(card[1]);
const isHC = card => "HC".includes(card[1]);
const isHS = card => "HS".includes(card[1]);
const value = card => "ZA234567890JQK".indexOf(card[0]);
const isEven = card => value(card);
const last = s => s[s.length - 1];

const cards = "AC;AD;AH;AS;2C;2D;2H;2S;3C;3D;3H;3S;4C;4D;4H;4S;5C;5D;5H;5S;6C;6D;6H;6S;7C;7D;7H;7S;8C;8D;8H;8S;9C;9D;9H;9S;0C;0D;0H;0S;JC;JD;JH;JS;QC;QD;QH;QS;KC;KD;KH;KS".split(
  ";"
);

class App extends Component {
  scrollInterval = null;
  prevScroll = -1;

  handlePlay(card) {
    const { sequence, rule } = this.state;

    var rejectedCards = [];
    sequence.forEach(c => {
      if (c.accepted) {
        rejectedCards = [];
      } else {
        rejectedCards.push(c.card);
      }
    });

    if (rejectedCards.includes(card)) return;

    const accepted = rule(
      sequence.filter(x => x.accepted).map(x => x.card),
      card
    );
    this.setState({ sequence: [...sequence, { card, accepted }] });
    if (this.scrollInterval) clearInterval(this.scrollInterval);
    this.prevScroll = -1;
    this.scrollInterval = setInterval(() => {
      const elem = document.getElementById("table");
      if (elem.scrollLeft > this.prevScroll) {
        this.prevScroll = elem.scrollLeft;
        elem.scrollLeft = elem.scrollLeft + 4;
      } else {
        clearInterval(this.scrollInterval);
      }
    }, 10);
  }

  newRule = (difficulty, ruleIdx) => {
    const ruleIndex =
      ruleIdx === undefined
        ? Math.floor(Math.random() * rules[difficulty].length)
        : ruleIdx;
    const [_rule, solution] = rules[difficulty][ruleIndex];
    console.log(ruleIndex);
    console.log(solution);
    const rule = eval(_rule);
    const card = [...cards]
      .sort(() => 0.5 - Math.random())
      .find(x => rule([], x));

    const sequence = [{ card, accepted: true }];

    this.setState({
      _rule,
      rule,
      solution,
      sequence,
      view: "none"
    });
  };

  setView = v => {
    this.setState({ view: this.state.view === v ? "none" : v });
  };

  constructor(props) {
    super(props);

    this.state = {
      view: "intro"
    };
  }

  render() {
    const { _rule, sequence, view, solution } = this.state;
    const style = {
      top: 0,
      left: -120,
      marginTop: 10
    };

    return (
      <div className="App">
        <div className="title">
          <span id="title">ELEUSIS</span>
          {solution && (
            <button onClick={() => this.setView("solution")}>
              {view === "solution" ? "Cacher la Solution" : "Voir la Solution"}
            </button>
          )}
          <button onClick={() => this.newRule("easy", undefined)}>
            Nouvelle Règle Simple
          </button>
          <button onClick={() => this.newRule("hard", undefined)}>
            Nouvelle Règle Difficile
          </button>
          <button onClick={() => this.setView("list")}>
            Choisir une Règle
          </button>
          <button onClick={() => this.setView("custom")}>
            Créer une Règle
          </button>
        </div>
        <div id="table">
          {sequence &&
            sequence.map(({ card, accepted }, i) => {
              if (accepted) {
                style.top = 0;
                style.left = style.left + 128;
                style.marginTop = 10;
              } else {
                style.top = 150;
                style.marginTop = style.marginTop + 42;
              }
              return (
                <img
                  key={card + i}
                  src={"cards/" + card + ".png"}
                  style={{ ...style }}
                  className="card"
                />
              );
            })}
        </div>
        <div id="input">
          {cards.map((card, i) => {
            return (
              <img
                key={card + i}
                src={"cards/" + card + ".png"}
                className="card"
                style={{ left: 42 * i }}
                onClick={() => this.handlePlay(card)}
              />
            );
          })}
        </div>
        {view === "solution" && <div className="modal">{solution}</div>}
        {view === "list" && (
          <div className="modal">
            <span>Règles Simples:</span>
            {rules.easy.map(([_, solution], ruleIndex) => (
              <div
                key={solution}
                className="rule-button"
                onClick={() => this.newRule("easy", ruleIndex)}
              >
                <b>Règle {ruleIndex + 1}: </b>
                {solution}
              </div>
            ))}
            <span>Règles Difficiles:</span>
            {rules.hard.map(([_, solution], ruleIndex) => (
              <div
                key={solution}
                className="rule-button"
                onClick={() => this.newRule("hard", ruleIndex)}
              >
                <b>Règle {ruleIndex + 1}: </b>
                {solution}
              </div>
            ))}
          </div>
        )}
        {view === "custom" && (
          <div className="modal">
            <span>Créer une nouvelle règle</span>
            <p className="description">
              Malheureusement cette option n'est pas encore disponible. Si vous
              voulez ajouter une règle vous pouvez m'envoyer votre idée par
              email à l'adresse lpfaucon@gmail.com ou bien visiter la page
              github du projet:
              <a href="https://github.com/lfaucon/eleusis">
                https://github.com/lfaucon/eleusis
              </a>
              .
            </p>
          </div>
        )}
        {view === "intro" && (
          <div className="modal">
            <span>Bienvenue sur le jeu en ligne Eleusis.</span>
            <p className="description">
              Pour apprendre les règles du jeu je vous conseille de visonner
              cette vidéo:{" "}
              <a href="https://www.youtube.com/watch?v=wV4AIhDAz_I">
                https://www.youtube.com/watch?v=wV4AIhDAz_I
              </a>
            </p>
            <p className="description">
              Sur ce site le jeu est une variante du jeu d'Eleusis. Il s'agit
              seulement de deviner la règle et à chaque tour n'importe quelle
              des 52 cartes peut être jouer.
            </p>
            <p className="description">
              Vous pouvez utiliser ce site comme il vous semble. Par exemple:
              vous pouvez jouer tout seul à essayer de deviner la règle
              correctement en ayant joué le moins de cartes possibles; Vous
              pouvez aussi jouer en groupe sur le même ordinateur.
            </p>
            <button onClick={() => this.newRule("easy", undefined)}>
              Nouvelle Règle Simple
            </button>
            <button onClick={() => this.newRule("hard", undefined)}>
              Nouvelle Règle Difficile
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
