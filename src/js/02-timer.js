import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const subscriptions = document.querySelectorAll('.value');
const timer = document.querySelector('.timer');
let subscription = timer.querySelector('.field');
let setTime = 0;
const picker = document.querySelector('#datetime-picker');

startBtn.setAttribute('disabled', true);
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
    startBtn.removeAttribute('disabled');
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', convertMs);

function convertMs() {
  // Number of milliseconds per unit of time
  startBtn.setAttribute('disabled', true);
  picker.setAttribute('disabled', true);

  const timerId = setInterval(() => {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor((setTime - Date.now()) / day);
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
  const timeData = { days, hours, minutes, seconds };
  for (const el in timeData) {
    document.querySelector(`[data-${el}]`).textContent = timeData[`${el}`]
      .toString()
      .padStart(2, '0');
  }
}
