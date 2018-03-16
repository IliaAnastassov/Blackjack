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

    getValue() {
        let value = 0;

        if (this.rank === "Ace") {
            value = 11;
        } else if (this.rank === "Jack" || this.rank === "Queen" || this.rank === "King") {
            value = 10;
        } else {
            value = parseInt(this.rank);
        }

        return value;
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
    stayButton = document.getElementById("stay-button")
    outcomeHeader = document.getElementById("outcome-header");

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

    outcomeHeader.style.display = "none";
    outcomeHeader.innerText = "";
    
    newGameButton.style.display = "none";
    hitButton.style.display = "inline";
    stayButton.style.display = "inline";

    showStatus();
});

hitButton.addEventListener("click", function () {
    playerCards.push(deck.dealCard());
    showStatus();
});

stayButton.addEventListener("click", function () {
    dealerCards.push(deck.dealCard());
    showStatus();
})

// Functions
function showStatus() {
    if (!gameStarted) {
        textArea.innerText = "Welcome to Blackjack!";
    } else {
        // Dealer
        textArea.innerText = "Dealer has:\n";
        dealerCards.forEach(card => {
            textArea.innerText += card.toString() + "\n";
        });
        dealerScore = calculateScore(dealerCards);
        textArea.innerText += "Dealer score: " + dealerScore + "\n\n";

        // Player
        textArea.innerText += "You have:\n";
        playerCards.forEach(card => {
            textArea.innerText += card.toString() + "\n";
        });
        playerScore = calculateScore(playerCards);
        textArea.innerText += "Your score: " + playerScore;

        // Outcome
        if (dealerScore === 21 || playerScore > 21) {
            gameOver = true;
        } else if (playerScore === 21 || dealerScore > 21) {
            gameOver = true;
            playerWon = true;
        }

        if (gameOver) {
            outcomeHeader.style.display = "block";

            if (playerWon) {
                outcomeHeader.innerText += "You win";
            } else {
                outcomeHeader.innerText += "Dealer wins";
            }

            newGameButton.style.display = "inline";
            hitButton.style.display = "none";
            stayButton.style.display = "none";
        }
    }
}

function calculateScore(cards) {
    let score = 0;
    let hasAce = false;

    cards.forEach(card => {
        score += card.getValue();

        if (card.rank === "Ace") {
            hasAce = true;
        }
    });

    if (hasAce && score > 21) {
        score -= 10;
    }

    return score;
}
