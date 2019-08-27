import React, { Component, useState } from "react";
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

const Solution = ({ handlePlay, sequence, rule, solution, newRule }) => {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState([0, 0, 0, 0, 0]);
  const [feedback, setFeedback] = useState("none");
  const [card, setCard] = useState("");

  const newCard = () => {
    const randCards = [...cards]
      .filter(x => x !== card)
      .sort(() => 0.5 - Math.random());
    const seq = sequence.filter(x => x.accepted).map(x => x.card);
    const _card =
      Math.random() > 0.5
        ? randCards.find(x => !rule(seq, x))
        : randCards.find(x => rule(seq, x));
    return _card ? _card : randCards[0];
  };

  if (card === "") setCard(newCard());

  const scorePrediction = prediction => {
    if (feedback !== "none") return;
    const result = handlePlay(card);
    if (result === prediction) {
      status[step] = 1;
      setFeedback("correct" + (prediction ? "A" : "R"));
    } else {
      status[step] = -1;
      setFeedback("wrong" + (prediction ? "A" : "R"));
    }
    setStatus([...status]);
    setTimeout(() => {
      setFeedback("none");
      setStep(step + 1);
      setCard(newCard());
    }, 750);
  };

  return (
    <div className="modal">
      <div className="star-container">
        {status.map((s, i) =>
          s > 0 ? (
            <i key={i} className="far fa-check-circle green" />
          ) : s < 0 ? (
            <i key={i} className="far fa-times-circle red" />
          ) : (
            <i key={i} className="far fa-circle" />
          )
        )}
      </div>
      {step < 5 && (
        <p className="description">
          Pour confirmer votre idée de règle, répondez à 5 questions. Acceptez
          ou rejetez les cartes comme vous pensez que la règle secrète le
          ferait.
        </p>
      )}
      {step < 5 && <img src={"cards/" + card + ".png"} className="test-card" />}
      {step < 5 && (
        <div className="test-button">
          <button onClick={() => scorePrediction(false)}>
            {feedback === "correctR" ? (
              <i className="fas fa-check feedback green" />
            ) : feedback === "wrongR" ? (
              <i className="fas fa-times feedback red" />
            ) : (
              "Rejeter"
            )}
          </button>
          <button onClick={() => scorePrediction(true)}>
            {feedback === "correctA" ? (
              <i className="fas fa-check feedback green" />
            ) : feedback === "wrongA" ? (
              <i className="fas fa-times feedback red" />
            ) : (
              "Accepter"
            )}
          </button>
          <u className="skip" onClick={() => setStep(10)}>
            voir la solution sans faire le test
          </u>
        </div>
      )}
      {step > 4 && (
        <div>
          <p className="result-message">
            {status.filter(x => x > 0).length === 5
              ? "C'est Parfait !"
              : status.filter(x => x > 0).length === 4
              ? "Très bon score !"
              : "Dommage ! "}
          </p>
          <p>Score: {status.filter(x => x > 0).length} / 5</p>
          <div className="rule-display">
            <p className="description">Solution:</p>
            <p>{solution}</p>
          </div>
          <button onClick={() => newRule("easy", undefined)}>
            Nouvelle Règle Simple
          </button>
          <button onClick={() => newRule("hard", undefined)}>
            Nouvelle Règle Difficile
          </button>
        </div>
      )}
    </div>
  );
};

const Intro = ({ newRule, setView, setSequence }) => (
  <div className="modal">
    <span>Bienvenue sur le jeu en ligne Eleusis.</span>
    <p className="description">
      Pour apprendre les règles du jeu vous pouvez cliquer sur le boutton
      "Apprendre les règles" ci-dessous ou bien visonner cette vidéo:{" "}
      <a href="https://www.youtube.com/watch?v=wV4AIhDAz_I">
        https://www.youtube.com/watch?v=wV4AIhDAz_I
      </a>
    </p>
    <p className="description">
      Sur ce site le jeu est une variante du jeu d'Eleusis qui peut être jouée
      seul, mais vous pouvez aussi jouer à plusieurs sur le même ordinateur.
    </p>
    <button
      onClick={() => {
        newRule("easy", 0);
        setSequence([]);
        setView("tutoriel");
      }}
    >
      Apprendre les règles
    </button>
    <button onClick={() => newRule("easy", undefined)}>
      Nouvelle Règle Simple
    </button>
    <button onClick={() => newRule("hard", undefined)}>
      Nouvelle Règle Difficile
    </button>
  </div>
);

const RuleList = ({ newRule }) => (
  <div className="modal">
    <span>Règles Simples:</span>
    {rules.easy.map(([_, solution], ruleIndex) => (
      <div
        key={solution}
        className="rule-button"
        onClick={() => newRule("easy", ruleIndex)}
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
        onClick={() => newRule("hard", ruleIndex)}
      >
        <b>Règle {ruleIndex + 1}: </b>
        {solution}
      </div>
    ))}
  </div>
);

const Tutoriel = ({ setSequence, setView }) => {
  const [step, setStep] = useState(0);
  const accepted = true;

  if (step === 0) {
    return (
      <div className="modal">
        Règles (1/5)
        <p className="description">
          Le but du jeu est de découvrir une règle secrète. Cette règle
          détermine quelles cartes peuvent être jouées ou non.
        </p>
        <button
          onClick={() => {
            setStep(1);
            setSequence([
              { card: "QH", accepted },
              { card: "0S", accepted },
              { card: "AH", accepted },
              { card: "8C", accepted }
            ]);
          }}
        >
          Suivant
        </button>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="modal">
        Règles (2/5)
        <p className="description">
          Les cartes acceptées forment une séquence de gauche à droite.
        </p>
        <button
          onClick={() => {
            setStep(2);
            setSequence([
              { card: "QH", accepted },
              { card: "KH", accepted: false },
              { card: "5D", accepted: false },
              { card: "0S", accepted },
              { card: "AH", accepted },
              { card: "8C", accepted },
              { card: "KC", accepted: false }
            ]);
          }}
        >
          Suivant
        </button>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="modal">
        Règles (3/5)
        <p className="description">
          Les cartes refusées sont placées en dessous à l'endroit où elles ont
          été jouées. Par exemple:
        </p>
        <ul className="description">
          <li>
            le roi de coeur et le 5 de carreau ont été refusés après la dame de
            coeur.
          </li>
          <li>le roi de trèfle a été refusé après le 8 de trèfle.</li>
        </ul>
        <button onClick={() => setStep(3)}>Suivant</button>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="modal">
        Règles (4/5)
        <p className="description">
          Pour jouer une nouvelle carte choisissez la carte de votre choix en
          bas de l'écran.
        </p>
        <p className="description">
          Dans le jeu d'Eleusis jouer une carte est comme faire une expérience
          qui permet de vérifier ou bien de réfuter les théories concernant la
          règle secrète.
        </p>
        <button onClick={() => setStep(4)}>Suivant</button>
      </div>
    );
  }

  return (
    <div className="modal">
      Règles (5/5)
      <p className="description">Devinez vous la règle de cet exemple?</p>
      <p className="description">
        A n'importe quel moment pendant une partie vous pourrez cliquer sur le
        bouton "Tester ma solution" dans la barre du haut si vous pensez avoir
        trouvé la règle secrète.
      </p>
      <button onClick={() => setView("intro")}>Fin du tutoriel</button>
    </div>
  );
};

class App extends Component {
  scrollInterval = null;
  prevScroll = -1;

  computeRejectedCards = sequence => {
    var rejectedCards = [];
    sequence.forEach(c => {
      if (c.accepted) {
        rejectedCards = [];
      } else {
        rejectedCards.push(c.card);
      }
    });
    this.setState({ rejectedCards });
  };

  handlePlay = card => {
    const { sequence, rule, rejectedCards } = this.state;
    if (!sequence || !rule || !rejectedCards) return;

    const accepted = rule(
      sequence.filter(x => x.accepted).map(x => x.card),
      card
    );

    if (rejectedCards.includes(card)) return accepted;

    const newSequence = [...sequence, { card, accepted }];
    this.setState({ sequence: newSequence });
    this.computeRejectedCards(newSequence);

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

    return accepted;
  };

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
      view: "intro",
      rejectedCards: []
    };
  }

  render() {
    const { _rule, rule, sequence, view, solution, rejectedCards } = this.state;
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
              Tester ma Solution
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
          {cards
            .filter(x => !rejectedCards.includes(x))
            .map((card, i) => {
              return (
                <img
                  key={card + i}
                  src={"cards/" + card + ".png"}
                  className="card input"
                  style={{ left: 42 * i }}
                  onClick={() => this.handlePlay(card)}
                />
              );
            })}
        </div>
        {view === "solution" && (
          <Solution
            handlePlay={this.handlePlay}
            sequence={sequence}
            rule={rule}
            solution={solution}
            newRule={this.newRule}
          />
        )}
        {view === "list" && <RuleList newRule={this.newRule} />}
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
          <Intro
            setSequence={x => this.setState({ sequence: x })}
            newRule={this.newRule}
            setView={this.setView}
          />
        )}
        {view === "tutoriel" && (
          <Tutoriel
            setSequence={x => this.setState({ sequence: x })}
            setView={this.setView}
          />
        )}
      </div>
    );
  }
}

export default App;
