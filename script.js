'use strict';

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0; // 0 -> refer to player 1  //  1 -> refer to player2
let playing = true;

// Starting conditions
const resetGame = () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  diceEl.classList.add('hidden');
  if (!player0El.classList.contains('player--active')) {
    player0El.classList.add('player--active');
  }
  player1El.classList.remove('player--active');
  scores = [0, 0];

  if (player0El.classList.contains('player--winner')) {
    player0El.classList.remove('player--winner');
  }
  if (player1El.classList.contains('player--winner')) {
    player1El.classList.remove('player--winner');
  }
  playing = true;
};
resetGame();

const switchPlayer = () => {
  // reset the currentScore for current player before switching
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //Switch to next player
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. check for rolled 1: if true
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch the player
      switchPlayer();
    }
  }
});

//Hold functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // display the score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      diceEl.classList.add('hidden');
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

//New game functionality
btnNew.addEventListener('click', function () {
  resetGame();
});
