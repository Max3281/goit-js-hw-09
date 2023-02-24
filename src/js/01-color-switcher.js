// const bodyEl = document.querySelector('body');
const startEl = document.querySelector('button[data-start]');
const stopEl = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let styleInterval = null;

startEl.addEventListener('click', onStartClick);

function onStartClick(evt) {
  styleInterval = setInterval(() => {
    startEl.parentNode.setAttribute(
      'style',
      `background-color: ${getRandomHexColor()};`
    );
  }, 500);
  evt.target.disabled = true;
}

stopEl.addEventListener('click', onStopClick);

function onStopClick(evt) {
  clearInterval(styleInterval);
  startEl.disabled = false;
}
