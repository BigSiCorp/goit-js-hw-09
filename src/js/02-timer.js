import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    return selectedDates[0];
  },
};

const fp = flatpickr('#datetime-picker', options);
startBtn.disabled = true;

input.addEventListener('input', setFutureDate);

function setFutureDate() {
  if (Date.parse(options.onClose()) < Date.now) {
    alert('Please choose a date in the future');
    return;
  }
  startBtn.disabled = false;
}

console.log(options);
