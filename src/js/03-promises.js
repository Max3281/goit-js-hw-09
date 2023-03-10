import Notiflix from 'notiflix';

const formSubmitEl = document.querySelector('.form');

formSubmitEl.addEventListener('submit', onClick);

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const randomValue = Math.random() > 0.3;
    setTimeout(() => {
      if (randomValue) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
  return promise;
}

function onClick(evt) {
  let fakeAmount = evt.target.amount.value;
  let fakeStep = Number(evt.target.step.value);
  let delay = Number(evt.target.delay.value);
  evt.preventDefault();
  console.log(fakeStep, fakeAmount);
  for (let position = 1; position <= fakeAmount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}`);
      });
    delay += fakeStep;
    console.log(delay);
  }
}
