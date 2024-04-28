import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formHere = document.querySelector('form.form');
let delay = document.querySelector("input[name='delay']");
let step = document.querySelector("input[name='step']");
let amount = document.querySelector("input[name='amount']");

formHere.addEventListener('submit', generateNow);

function generateNow(event) {
  event.preventDefault();
  let delayValue = Number(delay.value);

  if (delay.value < 1 || step.value < 1 || amount.value < 1) {
    Notify.failure('Please check your input!!!');
    return;
  }

  for (let count = 1; count <= amount.value; count++) {
    createPromise(count, delayValue)
      .then(({ countPass, delayPass }) => {
        Notify.success(`Fulfilled promise ${countPass} in ${delayPass}ms`);
      })
      .catch(({ countPass, delayPass }) => {
        Notify.failure(`Reject promise ${countPass} in ${delayPass}ms`);
      });
    delayValue += Number(step.value);
  }
}

function createPromise(countPass, delayPass) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ countPass, delayPass });
      } else {
        reject({ countPass, delayPass });
      }
    }, delayPass);
  });
}
