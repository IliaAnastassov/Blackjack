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

    shuffle() {
        for (let i = 0; i < this.cards.length; i++) {
            let swapIndex = Math.trunc(Math.random() * this.cards.length);
            let temp = this.cards[swapIndex];
            this.cards[swapIndex] = this.cards[i];
            this.cards[i] = temp;
        }
    }

    dealCard() {
        return this.cards.shift();
    }
}

// DOM variables
let textArea = document.getElementById("text-area"),
    newGameButton = document.getElementById("new-game-button"),
    hitButton = document.getElementById("hit-button"),
    stayButton = document.getElementById("stay-button");

// Game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck;

// Events
newGameButton.addEventListener("click", function () {
    gameStarted = true;
    gameOver = false;
    playerWon = false;

    deck = new Deck();
    deck.shuffle();
    dealerCards = [deck.dealCard(), deck.dealCard()];
    playerCards = [deck.dealCard(), deck.dealCard()];

    newGameButton.style.display = "none";
    hitButton.style.display = "inline";
    stayButton.style.display = "inline";

    showStatus();
});

hitButton.addEventListener("click", function () {
});

// Functions
function showStatus() {
    if (!gameStarted) {
        textArea.innerText = "Welcome to Blackjack!";
    } else {
        textArea.innerText = "You have been dealt:\n";
        playerCards.forEach(card => {
            textArea.innerText += card.toString() + "\n";
        });
    }
}