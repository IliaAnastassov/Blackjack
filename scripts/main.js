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

// DOM
let textArea = document.getElementById("text-area");
let newGameButton = document.getElementById("new-game-button");
let hitButton = document.getElementById("hit-button");
let stayButton = document.getElementById("stay-button");

hitButton.style.display = "none";
stayButton.style.display = "none";

newGameButton.addEventListener("click", function () {
    newGameButton.style.display = "none";
    hitButton.style.display = "inline";
    stayButton.style.display = "inline";
    
    let deck = new Deck();
    let playerCards = [];

    playerCards.push(deck.dealCard());
    playerCards.push(deck.dealCard());

    textArea.innerText = "You have been dealt:\n" + playerCards[0] + "\n" + playerCards[1];
});

hitButton.addEventListener("click", function () {
});

// Game
console.log("Welcome to Blackjack!");
console.log("You have been dealt:");
playerCards.forEach(card => {
    console.log("\t" + card.toString())
});

