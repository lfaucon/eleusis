import { Parser } from "jison";

const grammar = {
  comment: "JSON Math Parser",
  // JavaScript comments also work

  lex: {
    rules: [
      ["\\s+", "/* skip whitespace */"],
      ["[0-9]+(?:\\.[0-9]+)?\\b", "return 'NUMBER'"],
      ["\\*", "return '*'"],
      ["\\/", "return '/'"],
      ["-", "return '-'"],
      ["\\+", "return '+'"],
      ["\\^", "return '^'"],
      ["%", "return '%'"],
      ["\\(", "return '('"],
      ["\\)", "return ')'"],
      ["$", "return 'EOF'"],
      ["=", "return '='"],
      ["\\bNOT\\b", "return 'NOT'"],
      ["\\bAND\\b", "return 'AND'"],
      ["\\bOR\\b", "return 'OR'"],
      ["\\bXOR\\b", "return 'XOR'"],
      ["true\\b", "return 'true'"],
      ["false\\b", "return 'false'"],
      ["isRed", "return 'isRed'"],
      ["isFigure", "return 'isFigure'"],
      ["CARD", "return 'CARD'"],
      ["LAST", "return 'LAST'"],
      ["ANY", "return 'ANY'"],
      ["ALL", "return 'ALL'"]
    ]
  },

  operators: [
    ["left", "+", "-"],
    ["left", "*", "/"],
    ["left", "^"],
    ["left", "%"],
    ["left", "NOT"],
    ["left", "AND"],
    ["left", "OR"],
    ["left", "XOR"],
    ["left", "UMINUS"],
    ["left", "="]
  ],

  bnf: {
    expressions: [["e EOF", "return $1;"]],
    e: [
      ["CARD", "$$ = function(s,c) { return c } "],
      ["LAST", "$$ = function(s,c) { return s[s.length - 1] } "],
      [
        "isRed ( e )",
        "$$ = function(s,c) { return 'HD'.includes($3(s,c)[1]) }"
      ],
      [
        "isFigure ( e )",
        "$$ = function(s,c) { return 'JQK'.includes($3(s,c)[0]) }"
      ],
      ["e XOR e", "$$ = function(s,c) { return $1(s,c) !== $3(s,c) }"],
      ["e OR e", "$$ = function(s,c) { return $1(s,c) || $3(s,c) }"],
      ["e AND e", "$$ = function(s,c) { return $1(s,c) && $3(s,c) }"],
      ["NOT e", "$$ = function(s,c) { return !$2(s,c) }"],
      ["e = e", "$$ = function(s,c) { return $1(s,c) == $2(s,c) }"],
      ["e + e", "$$ = $1 + $3"],
      ["e - e", "$$ = $1-$3"],
      ["e * e", "$$ = $1*$3"],
      ["e / e", "$$ = $1/$3"],
      ["e ^ e", "$$ = Math.pow($1, $3)"],
      ["e % e", "$$ = $1 % $3"],
      ["- e", "$$ = -$2", { prec: "UMINUS" }],
      ["( e )", "$$ = $2"],
      ["NUMBER", "$$ = Number(yytext)"],
      ["true", "$$ = true"],
      ["false", "$$ = false"]
    ]
  }
};

// `grammar` can also be a string that uses jison's grammar format
var parser = new Parser(grammar);

// generate source, ready to be written to disk
var parserSource = parser.generate();

export default parser;
