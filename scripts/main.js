/* 
    Blackjack applicaiton
    by Ilia Anastassov
*/

function randomNumber(range) {
    return Math.round(Math.random() * range);
}

let deck = [
    "Two of Spades",
    "Three of Spades",
    "Four of Spades",
    "Five of Spades",
    "Six of Spades",
    "Seven of Spades",
    "Eight of Spades",
    "Nine of Spades",
    "Ten of Spades",
    "Jack of Spades",
    "Queen of Spades",
    "King of Spades",
    "Ace of Spades"
];

let playerCards = [
    deck.splice(randomNumber(deck.length - 1), 1),
    deck.splice(randomNumber(deck.length - 1), 1)
];

console.log("Welcome to Blackjack!");

console.log("You have been dealt:");
console.log("\t" + playerCards[0]);
console.log("\t" + playerCards[1]);
