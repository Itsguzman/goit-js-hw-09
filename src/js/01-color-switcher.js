function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const htmlBody = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let pageColor = null;

stopBtn.disabled = true;

function colorChange() {
  pageColor = setInterval(() => {
    htmlBody.style.backgroundColor = getRandomHexColor();
    stopBtn.disabled = false;
    startBtn.disabled = true;
  }, 1000);
}

function stopChange() {
  clearInterval(pageColor);
  stopBtn.disabled = true;
  startBtn.disabled = false;
}

startBtn.addEventListener('click', colorChange);
stopBtn.addEventListener('click', stopChange);
