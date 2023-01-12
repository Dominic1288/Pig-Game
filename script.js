"use strict";

function init() {
  resetCurrentScore();
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
  player0El.classList.add("player--active");
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add("hidden");
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  scores[0] = 0;
  scores[1] = 0;
}

function resetCurrentScore() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
}

function switchPlayer() {
  resetCurrentScore();
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting conditions
const scores = [0, 0];
let playing = true;
let currentScore = 0;
let activePlayer = 0;
init();

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generate a random dice roll
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${diceRoll}.png`;

    // 3. Check for rolled 1
    if (diceRoll !== 1) {
      // Add dice to current score
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // Switch to the next player
    } else {
      switchPlayer();
    }
  }
});

// Hold button funtionality
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// Start a new game
// Restore all initial playing conditions
btnNew.addEventListener("click", init);
