import { Notify } from 'notiflix/build/notiflix-notify-aio';
const timeOut = 5000;
Notify.init({
  position: 'right-top',
  width: '300px',
  timeout: timeOut,
  fontSize: '20px',
});

const form = document.querySelector('.form');
const button = document.querySelector('button');

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const { delay, step, amount } = e.currentTarget.elements;

  button.setAttribute('disabled', true);

  setTimeout(
    () => button.removeAttribute('disabled'),
    parseInt(delay.value) + step.value * amount.value + timeOut
  );

  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, (i - 1) * step.value + parseInt(delay.value))
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
