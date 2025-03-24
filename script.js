'use strict';

// Selecting elements
const player0El = document.querySelector('.firstBox');
const player1El = document.querySelector('.secondBox');
const score0El = player0El?.querySelector('.score');
const score1El = player1El?.querySelector('.score');
const current0El = player0El?.querySelector('.currentScore span:last-child');
const current1El = player1El?.querySelector('.currentScore span:last-child');
const diceEl = document.querySelector('.diceImage img');
const btnNew = document.querySelectorAll('.btn')[0];
const btnRules = document.querySelectorAll('.btn')[1];
const btnRoll = document.querySelectorAll('.btn')[2];
const btnHold = document.querySelectorAll('.btn')[3];
const winningModal = document.querySelector('.winningModal');
const modalRules = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnAgain = winningModal?.querySelector('.btn');
const status0Online = player0El?.querySelector('.status:first-of-type');
const status0Offline = player0El?.querySelector('.status:last-of-type');
const status1Online = player1El?.querySelector('.status:first-of-type');
const status1Offline = player1El?.querySelector('.status:last-of-type');

let scores, currentScore, activePlayer, playing;

// Confetti effect
const startConfetti = () => {
  const script = document.createElement('script');
  script.src =
    'https://cdn.jsdelivr.net/npm/canvas-confetti@1.0.1/dist/confetti.browser.min.js';
  script.onload = () =>
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
  document.body.appendChild(script);
};

const stopConfetti = () => {
  const scripts = document.querySelectorAll('script[src*="confetti"]');
  scripts.forEach(script => script.remove());
};

// Starting conditions
const init = function () {
  if (
    !score0El ||
    !score1El ||
    !current0El ||
    !current1El ||
    !winningModal ||
    !overlay
  ) {
    console.error('❌ Some required elements are missing in HTML!');
    return;
  }

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = '0';
  score1El.textContent = '0';
  current0El.textContent = '0';
  current1El.textContent = '0';

  diceEl?.parentElement?.classList.add('hidden');
  player0El?.classList.remove('player--winner');
  player1El?.classList.remove('player--winner');
  player0El?.classList.add('player--active');
  player1El?.classList.remove('player--active');
  winningModal?.classList.add('hidden');
  overlay?.classList.add('hidden');

  // Reset online/offline status
  status0Online?.classList.remove('hidden');
  status0Offline?.classList.add('hidden');
  status1Online?.classList.add('hidden');
  status1Offline?.classList.remove('hidden');

  stopConfetti();
};
init();

const switchPlayer = function () {
  document.querySelector(
    '.player--active .currentScore span:last-child'
  ).textContent = '0';
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El?.classList.toggle('player--active');
  player1El?.classList.toggle('player--active');

  // Toggle online/offline status
  status0Online?.classList.toggle('hidden');
  status0Offline?.classList.toggle('hidden');
  status1Online?.classList.toggle('hidden');
  status1Offline?.classList.toggle('hidden');
};

// Rolling dice functionality
btnRoll?.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl?.parentElement?.classList.remove('hidden');
    if (diceEl) diceEl.src = `./img/dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(
        '.player--active .currentScore span:last-child'
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold?.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector('.player--active .score').textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl?.parentElement?.classList.add('hidden');
      document
        .querySelector('.player--active')
        ?.classList.add('player--winner');

      winningModal?.classList.remove('hidden');
      overlay?.classList.remove('hidden');
      winningModal.querySelector('p').textContent = `🎊 Player ${
        activePlayer + 1
      } Wins! 🎊`;

      startConfetti();
    } else {
      switchPlayer();
    }
  }
});

// Modal Rules Open/Close
btnRules?.addEventListener('click', function () {
  modalRules?.classList.remove('hidden');
  overlay?.classList.remove('hidden');
});
btnCloseModal?.addEventListener('click', function () {
  modalRules?.classList.add('hidden');
  overlay?.classList.add('hidden');
});

//keyboard events
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    init(); // New Game
    modalRules?.classList.add('hidden');
    overlay?.classList.add('hidden');
  } else if (event.key === 'r' || event.key === 'R') {
    btnRoll.click(); // Roll Dice
  } else if (event.key === ' ') {
    btnHold.click(); // Hold
  }
});

// Restart game with "Again" button in winning modal
btnAgain?.addEventListener('click', init);
btnNew?.addEventListener('click', init);
