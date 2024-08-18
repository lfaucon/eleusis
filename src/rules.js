export default {
  easy: [
    '//Accept only Red cards\n(card) => isRed(card)',
    '//Accept only Black cards\n(card) => isBlack(card)',
    '//Accept only Figures\n(card) => isFigure(card)',
    '//Accept only Numbers\n(card) => isNumber(card)',
    '//Play only cards above 4\n(card) => getValue(card) > 4',
    '//Play only cards above 5\n(card) => getValue(card) > 5',
    '//Play only cards above 6\n(card) => getValue(card) > 6',
    '//Play only cards above 7\n(card) => getValue(card) > 7',
    '//Play only cards above 8\n(card) => getValue(card) > 8',
    '//Play only cards above 9\n(card) => getValue(card) > 9',
    '//Play only cards below 4\n(card) => getValue(card) < 4',
    '//Play only cards below 5\n(card) => getValue(card) < 5',
    '//Play only cards below 6\n(card) => getValue(card) < 6',
    '//Play only cards below 7\n(card) => getValue(card) < 7',
    '//Play only cards below 8\n(card) => getValue(card) < 8',
    '//Play only cards below 9\n(card) => getValue(card) < 9',
    '//Accept only Heart and Spade\n(card) => "HS".includes(getSymbol(card))',
    '//Accept only Diamond and Spade\n(card) => "DS".includes(getSymbol(card))',
    '//Accept only Diamond and Clubs\n(card) => "DC".includes(getSymbol(card))',
    '//Accept only Heart and Clubs\n(card) => "HC".includes(getSymbol(card))',
    '//Accept only Hearts\n(card) => getSymbol(card) === "H"',
    '//Accept only Spades\n(card) => getSymbol(card) === "S"',
    '//Accept only Clubs\n(card) => getSymbol(card) === "C"',
    '//Accept only Diamonds\n(card) => getSymbol(card) === "D"',
    '//Accept only values that are square numbers\n(card) => [1,4,9].includes(getValue(card))',
    '//Accept only values that are prime numbers\n(card) => [2,3,5,7,11,13].includes(getValue(card))',
    '//Accept only values that are not prime numbers\n(card) => [1,4,6,8,9,10,12].includes(getValue(card))',
    '//Accept only Red Figures or Black Numbers\n(card) => isRed(card) === isFigure(card)',
    '//Accept only Black Figures or Red Numbers\n(card) => isBlack(card) === isFigure(card)',
    '//Accept only even values\n(card) => getValue(card) % 2 === 0',
    '//Accept only odd values\n(card) => getValue(card) % 2 === 1',
    '//Accept only multiples of 3\n(card) => getValue(card) % 3 === 0',
    '//Accept only values that are 1 plus a multiple of 3 \n(card) => getValue(card) % 3 === 1',
    '//Accept only multiples of 4\n(card) => getValue(card) % 4 === 0',
    '//Accept only values that are 1 plus a multiple of 4 \n(card) => getValue(card) % 4 === 1',
    '//Accept only even red and odd black cards\n(card) => (getValue(card) % 2 === 0) === isRed(card)',
    '//Accept only odd red and even black cards\n(card) => (getValue(card) % 2 === 1) === isRed(card)',
    '//Accept only red prime or black not-prime\n(card) => [2,3,5,7,11,13].includes(getValue(card)) === isRed(card)',
    '//Accept only red not-prime or black prime\n(card) => [2,3,5,7,11,13].includes(getValue(card)) === isBlack(card)',
  ],
  medium: [
    '//Alternate Red and Black\n(card, history) => !getLast(history) || isRed(card) !== isRed(getLast(history))',
    '//Difference between consecutive cards must be 2 or more\n(card, history) => !getLast(history) || Math.abs(getValue(card) - getValue(getLast(history))) > 1',
    '//Difference between consecutive cards must be 3 or more\n(card, history) => !getLast(history) || Math.abs(getValue(card) - getValue(getLast(history))) > 2',
    '//Difference between consecutive cards must be 4 or more\n(card, history) => !getLast(history) || Math.abs(getValue(card) - getValue(getLast(history))) > 3',
    '//Difference between consecutive cards must be 5 or more\n(card, history) => !getLast(history) || Math.abs(getValue(card) - getValue(getLast(history))) > 4',
    '//Difference between consecutive cards must be 1 or less\n(card, history) => !getLast(history) || Math.abs(getValue(card) - getValue(getLast(history))) < 2',
    '//Difference between consecutive cards must be 2 or less\n(card, history) => !getLast(history) || Math.abs(getValue(card) - getValue(getLast(history))) < 3',
    '//Difference between consecutive cards must be 3 or less\n(card, history) => !getLast(history) || Math.abs(getValue(card) - getValue(getLast(history))) < 4',
    '//Difference between consecutive cards must be 4 or less\n(card, history) => !getLast(history) || Math.abs(getValue(card) - getValue(getLast(history))) < 5',
    '//Difference between consecutive cards must be 5 or less\n(card, history) => !getLast(history) || Math.abs(getValue(card) - getValue(getLast(history))) < 6',
    '//Difference between consecutive cards must be exactly 1\n(card, history) => !getLast(history) || Math.abs(getValue(card) - getValue(getLast(history))) === 1',
    '//Difference between consecutive cards must be exactly 2\n(card, history) => !getLast(history) || Math.abs(getValue(card) - getValue(getLast(history))) === 2',
    '//Difference between consecutive cards must be exactly 3\n(card, history) => !getLast(history) || Math.abs(getValue(card) - getValue(getLast(history))) === 3',
    '//Alternate strictly above and below 5\n(card, history) => !getLast(history) || (getValue(card) > 5) !== (getValue(getLast(history)) > 5)',
    '//Alternate strictly above and below 6\n(card, history) => !getLast(history) || (getValue(card) > 6) !== (getValue(getLast(history)) > 6)',
    '//Alternate strictly above and below 7\n(card, history) => !getLast(history) || (getValue(card) > 7) !== (getValue(getLast(history)) > 7)',
    '//Alternate strictly above and below 8\n(card, history) => !getLast(history) || (getValue(card) > 8) !== (getValue(getLast(history)) > 8)',
    '//Alternate strictly above and below 9\n(card, history) => !getLast(history) || (getValue(card) > 9) !== (getValue(getLast(history)) > 9)',
    '//Alternate even and odd values\n(card, history) => !getLast(history) || (getValue(card) % 2 !== getValue(getLast(history)) % 2)',
    '//Same Symbol or same value\n(card, history) => !getLast(history) || getSymbol(card) === getSymbol(getLast(history)) || getValue(card) === getValue(getLast(history))',
    '//Always same Symbol unless after a Figure\n(card, history) => !getLast(history) || (getSymbol(card) === getSymbol(getLast(history))) !== isFigure(getLast(history))',
    '//Always same Symbol unless playing a Figure\n(card, history) => !getLast(history) || (getSymbol(card) === getSymbol(getLast(history))) !== isFigure(card)',
    '//Always same Symbol unless playing a odd\n(card, history) => !getLast(history) || (getSymbol(card) === getSymbol(getLast(history))) !== (getValue(card) % 2 === 1)',
    '//Always same Symbol unless playing a even\n(card, history) => !getLast(history) || (getSymbol(card) === getSymbol(getLast(history))) !== (getValue(card) % 2 === 0)',
    '//Always same Symbol unless playing a multiple of 3\n(card, history) => !getLast(history) || (getSymbol(card) === getSymbol(getLast(history))) !== (getValue(card) % 3 === 0)',
    '//Always same Symbol unless changing color\n(card, history) => !getLast(history) || getSymbol(card) === getSymbol(getLast(history)) || isRed(card) !== isRed(getLast(history))',
    '//Always change Symbol and value\n(card, history) => (getSymbol(card) !== getSymbol(getLast(history)) && getValue(card) !== getValue(getLast(history)))',
    '//Always change Symbol\n(card, history) => getSymbol(card) !== getSymbol(getLast(history))',
    '//Alternate Figures and Numbers\n(card, history) => !getLast(history) || isFigure(card) !== isFigure(getLast(history))',
    '//No two odds in a row\n(card, history) => !getLast(history) || getValue(card) % 2 !== 1 || getValue(getLast(history)) % 2 !== 1',
    '//No two evens in a row\n(card, history) => !getLast(history) || getValue(card) % 2 !== 0 || getValue(getLast(history)) % 2 !== 0',
    '//No two multiples of three in a row\n(card, history) => !getLast(history) || getValue(card) % 3 !== 0 || getValue(getLast(history)) % 3 !== 0',
    '//No two Figures in a row\n(card, history) => !isFigure(card) || !isFigure(getLast(history))',
    '//No two Numbers in a row\n(card, history) => !isNumber(card) || !isNumber(getLast(history))',
    '//No two Red in a row\n(card, history) => !isRed(card) || !isRed(getLast(history))',
    '//No two Black in a row\n(card, history) => !isBlack(card) || !isBlack(getLast(history))',
    '//Lower value or play a Figures\n(card, history) => !getLast(history) || isFigure(card) || getValue(card) < getValue(getLast(history))',
    '//Increase value or play an Ace\n(card, history) => getValue(card) === 1 || getValue(card) > getValue(getLast(history))',
    '//Strictly increase value\n(card, history) => !getLast(history) || getValue(card) > getValue(getLast(history))',
    '//Strictly decrease value\n(card, history) => !getLast(history) || getValue(card) < getValue(getLast(history))',
    '//Do not decrease value\n(card, history) => !getLast(history) || getValue(card) >= getValue(getLast(history))',
    '//Do not increase value\n(card, history) => !getLast(history) || getValue(card) <= getValue(getLast(history))',
    '//After red play odd, after black play even\n(card, history) => !getLast(history) || (getValue(card) % 2 === 1) === isRed(getLast(history))',
    '//After red play even, after black play odd\n(card, history) => !getLast(history) || (getValue(card) % 2 === 0) === isRed(getLast(history))',
    '//After odd play red, after even play black\n(card, history) => !getLast(history) || (getValue(getLast(history)) % 2 === 1) === isRed(card)',
    '//After even play red, after odd play black\n(card, history) => !getLast(history) || (getValue(getLast(history)) % 2 === 0) === isRed(card)',
    '//If playing red increase, else decrease or equal \n(card, history) => !getLast(history) || isRed(card) === (getValue(getLast(history)) > getValue(card))',
    '//If playing black increase, else decrease or equal \n(card, history) => !getLast(history) || isBlack(card) === (getValue(getLast(history)) > getValue(card))',
    '//If playing red decrease, else increase or equal \n(card, history) => !getLast(history) || isRed(card) === (getValue(getLast(history)) < getValue(card))',
    '//If playing black decrease, else increase or equal \n(card, history) => !getLast(history) || isBlack(card) === (getValue(getLast(history)) < getValue(card))',
    '//After red increase, else decrease or equal \n(card, history) => !getLast(history) || isRed(getLast(history)) === (getValue(getLast(history)) > getValue(card))',
    '//After black increase, else decrease or equal \n(card, history) => !getLast(history) || isBlack(getLast(history)) === (getValue(getLast(history)) > getValue(card))',
    '//After red decrease, else increase or equal \n(card, history) => !getLast(history) || isRed(getLast(history)) === (getValue(getLast(history)) < getValue(card))',
    '//After black decrease, else increase or equal \n(card, history) => !getLast(history) || isBlack(getLast(history)) === (getValue(getLast(history)) < getValue(card))',
    '//Alternate (Heart and Spade) and not\n(card, history) => "HS".includes(getSymbol(card)) !== "HS".includes(getSymbol(getLast(history)))',
    '//Alternate (Heart and Clubs) and not\n(card, history) => "HC".includes(getSymbol(card)) !== "HC".includes(getSymbol(getLast(history)))',
    '//Alternate (Diamond and Spade) and not\n(card, history) => "DS".includes(getSymbol(card)) !== "DS".includes(getSymbol(getLast(history)))',
    '//Alternate (Diamond and Clubs) and not\n(card, history) => "DC".includes(getSymbol(card)) !== "DC".includes(getSymbol(getLast(history)))',
    '//Sum of consecutive values must be prime\n(card, history) => !getLast(history) || [2, 3, 5, 7, 11, 13, 17, 19, 23].includes(getValue(card)+getValue(getLast(card)))',
    '//The last two cards must be coprime\n(card, history) => !getLast(history) || ![2, 3, 5, 7, 11, 13].find(q => getValue(card) % q === 0 && getValue(getLast(history)) % q === 0)',
  ],
  hard: [
    '//Accept at most 2 cards for each symbol\n(card, history) => history.filter(c => getSymbol(c) === getSymbol(card)).length < 2',
    '//Accept at most 3 cards for each symbol\n(card, history) => history.filter(c => getSymbol(c) === getSymbol(card)).length < 3',
    '//Accept at most 2 cards for each parity\n(card, history) => history.filter(c => getValue(c)%2 === getValue(card)%2).length < 2',
    '//Accept at most 3 cards for each parity\n(card, history) => history.filter(c => getValue(c)%2 === getValue(card)%2).length < 3',
    '//Accept at most 4 cards for each parity\n(card, history) => history.filter(c => getValue(c)%2 === getValue(card)%2).length < 4',
    '//Accept 5 cards then reject everything\n(card, history) => history.length < 5',
    '//Accept 6 cards then reject everything\n(card, history) => history.length < 6',
    '//Accept 7 cards then reject everything\n(card, history) => history.length < 7',
    '//Accept 8 cards then reject everything\n(card, history) => history.length < 8',
    '//Accept 9 cards then reject everything\n(card, history) => history.length < 9',
    '//Accept 10 cards then reject everything\n(card, history) => history.length < 10',
    '//Sum of all card must be exactly equal to 42, then reject\n(card, history) => [...history, card].map(getValue).reduce((a,b) => a+b,0) < 43',
    '//Same parity as the number of Red cards.\n(card, history) => getValue(card) % 2 === history.filter(isRed).length % 2',
    '//Never repeat a previous value.\n(card, history) => !history.find(c => getValue(c) === getValue(card))',
    '//Never repeat a previous value and only hearts.\n(card, history) => !history.find(c => getValue(c) === getValue(card)) && getSymbol(card) === "H"',
    '//Never repeat a previous value and only spade.\n(card, history) => !history.find(c => getValue(c) === getValue(card)) && getSymbol(card) === "S"',
    '//Never repeat a previous value and only clubs.\n(card, history) => !history.find(c => getValue(c) === getValue(card)) && getSymbol(card) === "C"',
    '//Never repeat a previous value and only diamond.\n(card, history) => !history.find(c => getValue(c) === getValue(card)) && getSymbol(card) === "D"',
    '//Every other card must have the same Symbol as previous card\n(card, history) => history.length % 2 === 0 || getSymbol(card) === getSymbol(getLast(history))',
    '//Only every third card can and must change the Symbol\n(card, history) => (history.length % 3 === 0) !== (getSymbol(card) === getSymbol(getLast(history)))',
    '//Every other card must have the same value as previous card\n(card, history) => history.length % 2 === 0 || getValue(card) === getValue(getLast(history))',
    '//Every other card must be Heart\n(card, history) => history.length % 2 === 0 || getSymbol(card) === "H"',
    '//Every other card must be Spade\n(card, history) => history.length % 2 === 0 || getSymbol(card) === "S"',
    '//Every other card must be Club\n(card, history) => history.length % 2 === 0 || getSymbol(card) === "C"',
    '//Every other card must be Diamond\n(card, history) => history.length % 2 === 0 || getSymbol(card) === "D"',
    '//Every other card must be the same value as the previous card\n(card, history) => history.length % 2 === 0 || getValue(card) === getValue(getLast(history))',
    '//Cards must cycle 1,2,3 modulo 3\n(card, history) => getValue(card) % 3 === (1 + history.length) % 3',
    '//Cards must cycle 1,2,3,4 modulo 4\n(card, history) => getValue(card) % 4 === (1 + history.length) % 4',
    '//Cards must cycle 1,2,3,4,5 modulo 5\n(card, history) => getValue(card) % 5 === (1 + history.length) % 5',
    '//Cards values must match the decimals of Pi\n(card, history) => getValue(card) === Number("31415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679"[history.length])',
    '//Play a figure only when the position in sequence is prime\n(card, history) => [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97].includes(history.length + 1) === isFigure(card)',
    '//Play a number only when the position in sequence is prime\n(card, history) => [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97].includes(history.length + 1) === isNumber(card)',
    '//Play a red only when the position in sequence is prime\n(card, history) => [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97].includes(history.length + 1) === isRed(card)',
    '//Play a black only when the position in sequence is prime\n(card, history) => [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97].includes(history.length + 1) === isBlack(card)',
    '//Card value cannot be more than the number of accepted card plus 1\n(card, history) => getValue(card) < history.length + 2',
    '//Card value cannot be less than the number of accepted card\n(card, history) => getValue(card) > history.length',
    '//Play a card among the symbols which have the least cards\n(card, history) => {const f = s => history.filter(c => getSymbol(c) === s).length; return !["H","D","C","S"].find(s => f(s) < f(getSymbol(card)));}',
    '//Match Fibnonacci sequence modulo 13\n(card, history) => history.length < 2 || getValue(card) % 13 === (getValue(history[history.length - 1]) + getValue(history[history.length - 2])) % 13',
    '//Match Fibnonacci sequence modulo 13, starting with 1,1,...\n(card, history) => history.length < 2 ? getValue(card) === 1 : (getValue(card) % 13 === (getValue(history[history.length - 1]) + getValue(history[history.length - 2])) % 13)',
    '//1 Red, 2 Black, 3 Red, 4 Black, ...\n(card, history) => isRed(card) === (Math.floor(0.5 + Math.sqrt(0.25 + 2 * history.length)) % 2 === 0)',
  ],
};

const french = {
  medium: [
    [
      '(s, c) => s.length === 0 || value(c) % 3 > 0 || value(s[s.length - 1]) % 3 > 0',
      'Ne pas jouer deux valeurs multiple de 3 à la suite (J=11, Q=12, K=13, A=1).',
    ],
    [
      '(s, c) => s.length === 0 || isHC(c) !== isHC(s[s.length - 1])',
      "Alterner entre 'Coeur et Trèfle' et 'Pique et Carreau'.",
    ],
    [
      '(s, c) => s.length === 0 || isHC(c) !== isHC(s[s.length - 1])',
      "Alterner entre 'Coeur et Pique' et 'Trèfle et Carreau'.",
    ],
    [
      '(s, c) => s.length < 2 || (value(c) !== value(s[s.length - 1]) && value(c) < value(s[s.length - 1]) !== value(s[s.length - 1]) < value(s[s.length - 2]))',
      'Alterner entre augmenter la valeur et diminuer la valeur des cartes.',
    ],
    [
      '(s, c) => s.length === 0 || isPrime(c) !== isPrime(s[s.length - 1])',
      'Alterner les valeurs qui sont et ne sont pas des nombres premiers (J=11, Q=12, K=13, A=1).',
    ],
    [
      '(s, c) => (s.length - value(c)) % 3 === 0',
      'La difference entre le nombre de cartes déjà acceptées et la valeur de la carte jouée doit être divisible par 3 Jouer seulement des valeurs paires rouges ou des valeurs impaires noires (J=11, Q=12, K=13, A=1).',
    ],
  ],
};
