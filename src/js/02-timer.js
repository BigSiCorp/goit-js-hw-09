import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
let setTime = 0;

startBtn.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    setTime = Date.parse(selectedDates);
    if (setTime < Date.now()) {
      alert('Please choose a date in the future');
      return;
    }
    startBtn.disabled = false;
  },
};

const fp = flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', convertMs);

function convertMs() {
  // Number of milliseconds per unit of time
  const timerId = setInterval(() => {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor((setTime - Date.now()) / day);
    console.log();
    // Remaining hours
    const hours = Math.floor(((setTime - Date.now()) % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(
      (((setTime - Date.now()) % day) % hour) / minute
    );
    // Remaining seconds
    const seconds = Math.floor(
      ((((setTime - Date.now()) % day) % hour) % minute) / second
    );

    countDown({ days, hours, minutes, seconds });
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(timerId);
    }
    return { days, hours, minutes, seconds };
  }, 1000);
}

function countDown({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = days;
  document.querySelector('[data-hours]').textContent = hours
    .toString()
    .padStart(2, '0');
  document.querySelector('[data-minutes]').textContent = minutes
    .toString()
    .padStart(2, '0');
  document.querySelector('[data-seconds]').textContent = seconds
    .toString()
    .padStart(2, '0');
}
