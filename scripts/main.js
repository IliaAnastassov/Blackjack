/* 
    Blackjack applicaiton
    by Ilia Anastassov
*/

let suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
let ranks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

let deck = [];

suits.forEach(suit => {
    ranks.forEach(rank => {
        deck.push(rank + " of " + suit);
    });
});

function randomNumber(range) {
    return Math.round(Math.random() * range);
}

let playerCards = [
    deck.splice(randomNumber(deck.length - 1), 1),
    deck.splice(randomNumber(deck.length - 1), 1)
];

console.log("Welcome to Blackjack!");

console.log("You have been dealt:");
console.log("\t" + playerCards[0]);
console.log("\t" + playerCards[1]);
