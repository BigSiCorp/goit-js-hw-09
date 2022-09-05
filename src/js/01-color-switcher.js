const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

stopBtn.disabled = true;
startBtn.addEventListener('click', makeStartBtnsDisable);
stopBtn.addEventListener('click', makeStopBtnsDisable);
let changeColor;

function makeStartBtnsDisable(event) {
  event.target.disabled = true;
  stopBtn.disabled = false;

  changeColor = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function makeStopBtnsDisable(event) {
  event.target.disabled = true;
  startBtn.disabled = false;
  clearInterval(changeColor);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
