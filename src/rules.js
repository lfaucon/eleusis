export default {
  easy: [
    [
      "(s, c) => s.length === 0 || isRed(c) !== isRed(s[s.length - 1])",
      "Alterner les cartes Rouges et Noires"
    ],
    ["(s, c) => true", "Toutes les cartes sont acceptées."],
    [
      '(s, c) => c[1] === "H" || c[1] === "S"',
      "Seulement Coeur et Pique sont acceptés."
    ],
    [
      '(s, c) => c[1] === "S" || c[1] === "D"',
      "Seulement Carreau et Pique sont acceptés."
    ],
    [
      '(s, c) => c[1] === "C" || c[1] === "D"',
      "Seulement Carreau et Trèfle sont acceptés."
    ],
    [
      '(s, c) => c[1] === "H" || c[1] === "C"',
      "Seulement Coeur et Trèfle sont acceptés."
    ],
    ["(s, c) => isRed(c)", "Seulement les cartes Rouges sont acceptées."],
    ["(s, c) => !isRed(c)", "Seulement les cartes Noires sont acceptées."],
    [
      "(s, c) => s.length === 0 || c[1] === s[s.length - 1][1] || c[0] === s[s.length - 1][0]",
      "Jouer soit la même Famille soit la même valeur."
    ],
    [
      "(s, c) => s.length === 0 || (c[1] !== s[s.length - 1][1] && c[0] !== s[s.length - 1][0])",
      "Toujours changer la Famille des cartes (Coeur, Carreau, Trèfle ou Pique)."
    ],
    [
      "(s, c) => s.length === 0 || isFigure(c) !== isFigure(s[s.length - 1])",
      "Faire alterner Têtes et Nombres (un As compte pour le nombre 1)."
    ],
    [
      "(s, c) => s.length === 0 || value(c) < value(s[s.length - 1]) || isFigure(c)",
      "Diminuer strictement la valeur ou jouer une Tête (J,Q,K)."
    ],
    [
      "(s, c) => s.length === 0 || value(c) > value(s[s.length - 1]) || c[0] === 'A'",
      "Augmenter strictement la valeur ou jouer un As (As=1 est la plus petite carte)."
    ],
    [
      "(s, c) => s.length % 2 === 0 || c[1] === s[s.length - 1][1]",
      "Une carte sur deux doit être de la même famille que la carte précédente."
    ],
    [
      "(s, c) => s.length === 0 || !isFigure(c) || !isFigure(s[s.length - 1])",
      "Ne pas jouer deux Têtes à la suite."
    ],
    [
      "(s, c) => s.length === 0 || isFigure(c) || isFigure(s[s.length - 1])",
      "Ne pas jouer deux Nombres à la suite (l'As compte comme le nomre 1)."
    ],
    [
      "(s, c) => s.length === 0 || !isRed(c) || !isRed(s[s.length - 1])",
      "Ne pas jouer deux cartes Rouges à la suite."
    ],
    [
      "(s, c) => s.length === 0 || isRed(c) || isRed(s[s.length - 1])",
      "Ne pas jouer deux cartes Noires à la suite."
    ],
    ['(s, c) => c[1] === "S"', "Jouer seulement des Piques."],
    ['(s, c) => c[1] === "H"', "Jouer seulement des Coeurs."],
    ['(s, c) => c[1] === "D"', "Jouer seulement des Carreaux."],
    ['(s, c) => c[1] === "C"', "Jouer seulement des Trèfles."],
    ["(s, c) => isFigure(c)", "Jouer seulement des Têtes."],
    ["(s, c) => !isFigure(c)", "Jouer seulement des Nombres."],
    [
      "(s, c) => s.length === 0 || c[1] !== s[s.length - 1][1]",
      "Ne pas jouer la même Famille que la carte précédente."
    ],
    [
      "(s, c) => isRed(c) === isFigure(c)",
      "Jouer seulement les Têtes Rouges ou bien les Nombres Noirs"
    ],
    [
      "(s, c) => isRed(c) === !isFigure(c)",
      "Jouer seulement les Nombres Rouges ou bien les Têtes Noires"
    ]
  ],
  hard: [
    [
      '(s, c) => s.length % 2 === 0 || c[1] === "H"',
      "Une carte sur deux doit être un Coeur."
    ],
    [
      '(s, c) => s.length % 2 === 0 || c[1] === "S"',
      "Une carte sur deux doit être un Pique."
    ],
    [
      '(s, c) => s.length % 2 === 0 || c[1] === "C"',
      "Une carte sur deux doit être un Trèfle."
    ],
    [
      '(s, c) => s.length % 2 === 0 || c[1] === "D"',
      "Une carte sur deux doit être un Carreau."
    ],
    [
      "(s, c) => !s.find(x => x[0] === c[0])",
      "Chaque valeur de carte ne peut être jouée qu'une seule fois."
    ],
    [
      "(s, c) => s.length === 0 || (value(s[s.length - 1]) + value(c)) % 2 === 1",
      "Alterner les valeurs paires et impaires (J=11, Q=12, K=13, A=1)."
    ],
    [
      "(s, c) => s.length === 0 || value(c) % 2 === (isRed(s[s.length - 1]) ? 0 : 1)",
      "Après une carte rouge jouer une valeur paire et après une carte noire jouer une valeur impaire (J=11, Q=12, K=13, A=1)."
    ],
    [
      "(s, c) => s.length === 0 || value(c) % 2 === (isRed(s[s.length - 1]) ? 1 : 0)",
      "Après une carte noire jouer une valeur paire et après une carte rouge jouer une valeur impaire (J=11, Q=12, K=13, A=1)."
    ],
    ["(s, c) => s.length < 10", "Only 10 cards can be played, not more."],
    [
      "(s, c) => s.length === 0 || (isRed(c) ? value(c) > value(s[s.length - 1]) : value(c) < value(s[s.length - 1]))",
      "Les cartes rouges doivent être supérieures à la carte précédente et les cartes noires inférieures."
    ],
    [
      "(s, c) => s.length === 0 || (!isRed(c) ? value(c) > value(s[s.length - 1]) : value(c) < value(s[s.length - 1]))",
      "Les cartes rouges doivent être inférieures à la carte précédente et les cartes noires supérieures."
    ],
    [
      "(s, c) => s.length === 0 || value(c) < 7 !== value(s[s.length - 1]) < 7",
      "Alterner les cartes inférieures à 7 et les cartes supérieures ou égales à 7 (J=11, Q=12, K=13, A=1)."
    ],
    [
      "(s, c) => s.length === 0 || value(c) < 6 !== value(s[s.length - 1]) < 6",
      "Alterner les cartes inférieures à 6 et les cartes supérieures ou égales à 6 (J=11, Q=12, K=13, A=1)."
    ],
    [
      "(s, c) => s.length === 0 || value(c) < 8 !== value(s[s.length - 1]) < 8",
      "Alterner les cartes inférieures à 8 et les cartes supérieures ou égales à 8 (J=11, Q=12, K=13, A=1)."
    ],
    [
      "(s, c) => s.length === 0 || (value(c) + value(s[s.length - 1])) % 3 === 0",
      "La somme des valeurs de deux cartes consécutives doit être un multiple de 3 (J=11, Q=12, K=13, A=1)."
    ],
    [
      "(s, c) => s.length === 0 || (value(c) + value(s[s.length - 1])) % 5 === 0",
      "La somme des valeurs de deux cartes consécutives doit être un multiple de 5 (J=11, Q=12, K=13, A=1)."
    ],
    [
      "(s, c) => s.length === 0 || (value(c) + value(s[s.length - 1])) % 5 === 2",
      "La somme des valeurs de deux cartes consécutives doit être un multiple de 5 plus 2 (J=11, Q=12, K=13, A=1)."
    ],
    [
      "(s, c) => s.length === 0 || Math.abs(value(c) - value(s[s.length - 1])) < 5",
      "La difference entre deux cartes consécutives doit être 4 ou moins (J=11, Q=12, K=13, A=1)."
    ],
    [
      "(s, c) => s.length === 0 || Math.abs(value(c) - value(s[s.length - 1])) < 4",
      "La difference entre deux cartes consécutives doit être 3 ou moins (J=11, Q=12, K=13, A=1)."
    ],
    [
      "(s, c) => s.length === 0 || Math.abs(value(c) - value(s[s.length - 1])) < 3",
      "La difference entre deux cartes consécutives doit être 2 ou moins (J=11, Q=12, K=13, A=1)."
    ],
    [
      "(s, c) => s.length === 0 || Math.abs(value(c) - value(s[s.length - 1])) > 2",
      "La difference entre deux cartes consécutives doit être 3 ou plus (J=11, Q=12, K=13, A=1)."
    ],
    [
      "(s, c) => s.length === 0 || Math.abs(value(c) - value(s[s.length - 1])) > 3",
      "La difference entre deux cartes consécutives doit être 4 ou plus (J=11, Q=12, K=13, A=1)."
    ],
    [
      "(s, c) => s.length === 0 || Math.abs(value(c) - value(s[s.length - 1])) > 4",
      "La difference entre deux cartes consécutives doit être 5 ou plus (J=11, Q=12, K=13, A=1)."
    ],
    [
      "(s, c) => s.length === 0 || value(c) % 3 > 0 || value(s[s.length - 1]) % 3 > 0",
      "Ne pas jouer deux valeurs multiple de 3 à la suite (J=11, Q=12, K=13, A=1)."
    ],
    [
      "(s, c) => s.length === 0 || isHC(c) !== isHC(s[s.length - 1])",
      "Alterner entre 'Coeur et Trèfle' et 'Pique et Carreau'."
    ],
    [
      "(s, c) => s.length === 0 || isHC(c) !== isHC(s[s.length - 1])",
      "Alterner entre 'Coeur et Pique' et 'Trèfle et Carreau'."
    ],
    [
      "(s, c) => s.length < 2 || (value(c) !== value(s[s.length - 1]) && value(c) < value(s[s.length - 1]) !== value(s[s.length - 1]) < value(s[s.length - 2]))",
      "Alterner entre augmenter la valeur et diminuer la valeur des cartes."
    ],
    [
      "(s, c) => value(c) < s.length + 2",
      "La valeur des cartes ne doit pas être plus que le nombre de carte acceptées plus 1 (J=11, Q=12, K=13, A=1))."
    ],
    [
      "(s, c) => s.length === 0 || isPrime(c) !== isPrime(s[s.length - 1])",
      "Alterner les valeurs qui sont et ne sont pas des nombres premiers (J=11, Q=12, K=13, A=1)."
    ],
    [
      "(s, c) => isPrime(c)",
      "Jouer seulement les valeurs qui sont des nombres premiers (J=11, Q=12, K=13, A=1)."
    ],
    [
      "(s, c) => !isPrime(c)",
      "Ne pas jouer les valeurs qui sont des nombres premiers (J=11, Q=12, K=13, A=1)."
    ],
    [
      "(s, c) => (s.length - value(c)) % 3 === 0",
      "La difference entre la nombre de cartes déjà acceptées et la valeur de la carte jouée doit être divisible par 3 Jouer seulement des valeurs paires rouges ou des valeurs impaires noires (J=11, Q=12, K=13, A=1)."
    ],
    [
      "(s, c) => isRed(c) === (value(c) % 2 === 1)",
      "Jouer seulement des valeurs paires noires ou des valeurs impaires rouges (J=11, Q=12, K=13, A=1)."
    ],
    [
      "(s, c) => isRed(c) === (value(c) % 2 === 0)",
      "Jouer seulement des valeurs paires rouges ou des valeurs impaires noires (J=11, Q=12, K=13, A=1)."
    ],
    [
      "(s, c) => value(c) % 2 === 0",
      "Jouer seulement des valeurs paires (J=11, Q=12, K=13, A=1)."
    ],
    [
      "(s, c) => value(c) % 2 === 1",
      "Jouer seulement des valeurs impaires (J=11, Q=12, K=13, A=1)."
    ],
    [
      "(s, c) => value(c) % 3 === 0",
      "Jouer seulement les valeurs qui sont des multiples de 3 (J=11, Q=12, K=13, A=1)."
    ],
    [
      "(s, c) => value(c) % 3 === 1",
      "Jouer seulement les valeurs qui sont des multiples de 3 plus 1 (J=11, Q=12, K=13, A=1)."
    ],
    [
      "(s, c) => s.length % 2 === 0 || isFigure(c)",
      "Une carte sur deux doit être une Tête (J, Q or K)."
    ]
  ]
};
