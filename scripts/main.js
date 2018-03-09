/* 
    Blackjack applicaiton
    by Ilia Anastassov
*/

function createDeck() {
    let deck = [];
    let suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
    let ranks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
    
    suits.forEach(suit => {
        ranks.forEach(rank => {
            deck.push(rank + " of " + suit);
        });
    });

    return deck;
}

function dealCard(deck) {
    let index = Math.round(Math.random() * deck.length - 1);
    return deck.splice(index, 1);
}

let deck = createDeck();

let playerCards = [
    dealCard(deck),
    dealCard(deck)
];

console.log("Welcome to Blackjack!");

console.log("You have been dealt:");
console.log("\t" + playerCards[0]);
console.log("\t" + playerCards[1]);
