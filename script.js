document.addEventListener('DOMContentLoaded', function () {
  const player0El = document.querySelector('.firstBox');
  const player1El = document.querySelector('.secondBox');
  const score0El = document.getElementById('score--0');
  const score1El = document.querySelector('.secondBox .score');
  const current0El = document.querySelector(
    '.firstBox .currentScore .currentScore'
  );
  const current1El = document.querySelector(
    '.secondBox .currentScore .currentScore'
  );
  const diceEl = document.querySelector('.diceImage img');
  const diceContainer = document.querySelector('.diceImage');

  const newGameBtn = document.querySelector('.btn:nth-of-type(1)');
  const rulesBtn = document.querySelector('.rulesBtn');
  const rollDiceBtn = document.querySelector('.btn:nth-of-type(3)');
  const holdBtn = document.querySelector('.btn:nth-of-type(4)');

  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.overlay');
  const closeModalBtn = document.querySelector('.close-modal');

  const winningModal = document.querySelector('.winningModal');
  const winnerText = document.querySelector('.winningModal p');
  const againBtn = document.querySelector('.winningModal .btn');

  // Selecting status elements correctly
  const player0Status = document.querySelectorAll('.firstBox .status');
  const player1Status = document.querySelectorAll('.secondBox .status');

  const player0Online = player0Status[0];
  const player0Offline = player0Status[1];
  const player1Online = player1Status[0];
  const player1Offline = player1Status[1];

  let scores, currentScore, activePlayer, playing;

  const updateStatus = function (active) {
    if (active === 0) {
      player0Online.classList.remove('hidden');
      player0Offline.classList.add('hidden');
      player1Online.classList.add('hidden');
      player1Offline.classList.remove('hidden');
    } else {
      player0Online.classList.add('hidden');
      player0Offline.classList.remove('hidden');
      player1Online.classList.remove('hidden');
      player1Offline.classList.add('hidden');
    }
  };

  const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceContainer.classList.add('hidden');
    winningModal.classList.add('hidden');
    overlay.classList.add('hidden');

    player0El.classList.remove('bg-[#00172b]');
    player1El.classList.add('bg-[#00172b]');

    updateStatus(0);
  };

  init();

  const switchPlayer = function () {
    currentScore = 0;
    document.querySelector(
      `.firstBox .currentScore .currentScore`
    ).textContent = activePlayer === 0 ? 0 : current0El.textContent;
    document.querySelector(
      `.secondBox .currentScore .currentScore`
    ).textContent = activePlayer === 1 ? 0 : current1El.textContent;
    activePlayer = activePlayer === 0 ? 1 : 0;

    player0El.classList.toggle('bg-[#00172b]');
    player1El.classList.toggle('bg-[#00172b]');

    updateStatus(activePlayer);
  };

  rollDiceBtn.addEventListener('click', function () {
    if (playing) {
      const dice = Math.trunc(Math.random() * 6) + 1;
      diceEl.src = `./img/dice-${dice}.png`;
      diceContainer.classList.remove('hidden');

      if (dice !== 1) {
        currentScore += dice;
        document.querySelector(
          `.firstBox .currentScore .currentScore`
        ).textContent =
          activePlayer === 0 ? currentScore : current0El.textContent;
        document.querySelector(
          `.secondBox .currentScore .currentScore`
        ).textContent =
          activePlayer === 1 ? currentScore : current1El.textContent;
      } else {
        switchPlayer();
      }
    }
  });

  holdBtn.addEventListener('click', function () {
    if (playing) {
      scores[activePlayer] += currentScore;
      document.querySelector(`#score--${activePlayer}`).textContent =
        scores[activePlayer];

      if (scores[activePlayer] >= 100) {
        playing = false;
        diceContainer.classList.add('hidden');

        winnerText.innerHTML = `🎊Player ${activePlayer + 1} Winner🎊`;
        winningModal.classList.remove('hidden');
        overlay.classList.remove('hidden');
      } else {
        switchPlayer();
      }
    }
  });

  newGameBtn.addEventListener('click', init);

  rulesBtn.addEventListener('click', function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });

  closeModalBtn.addEventListener('click', function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  });

  overlay.addEventListener('click', function () {
    modal.classList.add('hidden');
    winningModal.classList.add('hidden');
    overlay.classList.add('hidden');
  });

  againBtn.addEventListener('click', init);
});
