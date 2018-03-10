/* 
    Blackjack applicaiton
    by Ilia Anastassov
*/

// Card
class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }

    toString() {
        return this.rank + " of " + this.suit;
    }
}

// Deck
class Deck {
    constructor() {
        this.cards = [];
        let suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
        let ranks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

        suits.forEach(suit => {
            ranks.forEach(rank => {
                let card = new Card(suit, rank);
                this.cards.push(card);
            });
        });
    }

    dealCard() {
        return this.cards.shift();
    }
}

let deck = new Deck();
let playerCards = [
    deck.dealCard(),
    deck.dealCard()
];

// Game
console.log("Welcome to Blackjack!");
console.log("You have been dealt:");
playerCards.forEach(card => {
    console.log("\t" + card.toString())
});

