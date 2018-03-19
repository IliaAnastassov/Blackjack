/* 
    Blackjack applicaiton
    by Ilia Anastassov
*/

"use strict";

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
    stayButton = document.getElementById("stay-button"),
    outcomeHeader = document.getElementById("outcome-header"),
    playerStats = document.getElementById("player-stats"),
    playerWinsStats = document.getElementById("player-wins"),
    playerLossesStats = document.getElementById("player-losses"),
    tiesStats = document.getElementById("ties");

// Game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    playerBlackJack = false,
    isTie = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    playerWinsCount = 0,
    playerLossesCount = 0,
    tiesCount = 0,
    deck;

// Events
newGameButton.addEventListener("click", function () {
    gameStarted = true;
    gameOver = false;
    playerWon = false;
    playerBlackJack = false;
    isTie = false;

    deck = new Deck();
    deck.shuffle();
    dealerCards = [deck.dealCard(), deck.dealCard()];
    playerCards = [deck.dealCard(), deck.dealCard()];

    outcomeHeader.style.display = "none";
    outcomeHeader.innerText = "";

    newGameButton.style.display = "none";
    hitButton.style.display = "inline";
    stayButton.style.display = "inline";

    playerStats.style.display = "block";

    checkForEndOfGame();
    showStatus();
});

hitButton.addEventListener("click", function () {
    playerCards.push(deck.dealCard());
    checkForEndOfGame();
    showStatus();
});

stayButton.addEventListener("click", function () {
    gameOver = true;
    checkForEndOfGame();
    showStatus();
})

// Functions
function showStatus() {
    if (!gameStarted) {
        textArea.innerText = "Welcome to Blackjack!";
        return;
    }

    // Dealer
    let dealerCardString = "";
    dealerCards.forEach(card => {
        dealerCardString += card.toString() + "\n";
    });

    // Player
    let playerCardString = "";
    playerCards.forEach(card => {
        playerCardString += card.toString() + "\n";
    });

    updateScores();

    // Text Area
    textArea.innerText =
        "Dealer has:\n"
        + dealerCardString
        + "(" + "score: " + dealerScore + ")\n\n"
        + "Player has:\n"
        + playerCardString
        + "(" + "score: " + playerScore + ")";

    // Outcome
    if (gameOver) {
        showOutcome();

        newGameButton.style.display = "inline";
        hitButton.style.display = "none";
        stayButton.style.display = "none";
    }
}

function showOutcome() {
    outcomeHeader.style.display = "block";
    if (playerWon) {
        if (playerBlackJack) {
            outcomeHeader.innerText = "BLACKJACK! YOU WIN";
        } else {
            outcomeHeader.innerText = "YOU WIN";
        }
    } else if (isTie) {
        outcomeHeader.innerText = "IT'S A TIE";
    } else {
        outcomeHeader.innerText = "DEALER WINS";
    }
}

function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

function getScore(cardArray) {
    let score = 0;
    let hasAce = false;

    cardArray.forEach(card => {
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

function checkForEndOfGame() {
    updateScores();

    if (gameOver) {
        while (dealerScore < playerScore && dealerScore < 21 && dealerCards.length <= 5) {
            dealerCards.push(deck.dealCard());
            updateScores();
        }
    }

    if (dealerScore === 21 || playerScore > 21) {
        gameOver = true;
    } else if (playerScore === 21 || dealerScore > 21) {
        gameOver = true;
        playerWon = true;

        if (playerScore === 21) {
            playerBlackJack = true;
        }
    } else if (gameOver) {
        if (playerScore < dealerScore || dealerCards.length === 5) {
            playerWon = false;
        } else if (playerScore === dealerScore) {
            isTie = true;
        } else {
            playerWon = true;
        }
    }

    updateStats();
}

function updateStats() {
    if (gameOver) {
        if (playerWon) {
            playerWinsCount++;
        } else if (isTie) {
            tiesCount++;
        } else {
            playerLossesCount++;
        }

        playerWinsStats.innerText = "Wins: " + playerWinsCount;
        playerLossesStats.innerText = "Losses: " + playerLossesCount;
        tiesStats.innerText = "Ties: " + tiesCount;
    }
}
