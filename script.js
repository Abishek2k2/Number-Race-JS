'use strict';
// both work the same it gets the elements with an given id
// getElementBYId is more faster when lasrger numbers of id's are used
// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1'); //to change their classnames dynamically with javascript
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //El means an elements
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0; //this can't be inside the function as each time it loops it's value is changed
  activePlayer = 0; //to choose which is the active player
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden'); // Hiding the dice before the start of the game
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchLayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //if active player is 0 switching to 1 {activePlayer}
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.Generating a Random Dice Roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2.Display the Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3.Check for Rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //Change later
    } else {
      // switch to next player
      switchLayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //state variable playing
    //1.Add current score to active player's score
    scores[activePlayer] += currentScore;
    //Ex: scores[1] = score[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`) //don't forget . when using class in selector
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //3.Switch to the next player
      switchLayer();
    }
  }
});

btnNew.addEventListener('click', init);
