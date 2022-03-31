'use strict';
//select element:
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//NOTE: SWITCH PLAYER:
const switchPlayer = () => {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1El.classList.toggle('player--active');
  player0El.classList.toggle('player--active');
};
// NOTE: Starting conditions / RESET THE GAME

let activePlayer, scores, playing, currentScore;
const innit = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
innit();
// NOTE:Rolling dice functionality:
btnRoll.addEventListener('click', () => {
  if (playing) {
    diceEl.classList.remove('hidden');
    // 1. Generating a random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.src = `dice-${dice}.png`;
    // 3. Chedck for the rolled 1: if trure , swicth to next player
    if (dice !== 1) {
      // Added dice to current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

//NOTE: HOLD:

btnHold.addEventListener('click', () => {
  // 1. Add current score to active player's score
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      diceEl.classList.add('hidden');
      // Switch player
    } else switchPlayer();
  }
});

// NOTE: RESET THE GAME:
btnNew.addEventListener('click', () => {
  innit();
});
