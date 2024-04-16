'use strict';

// RULES MODAL CODE
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const rulesBtn = document.querySelector('.rulesBtn');
const closeModalBtn = document.querySelector('.close-modal');

const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

rulesBtn.addEventListener('click', function () {
  openModal();
});
closeModalBtn.addEventListener('click', function () {
  closeModal();
});
