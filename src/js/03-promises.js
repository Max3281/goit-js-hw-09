import Notiflix from 'notiflix';

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     console.log('success');
//   } else {
//     console.log('not success');
//   }
// }

const promiseFormEl = document.querySelector('.form');
const amountEl = document.getElementsByName('amount');

promiseFormEl.addEventListener('submit', getPromise);

function getPromise(evt) {
  evt.preventDefault();
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.5;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise 1 in 2ms`);
      }
      reject('❌ Rejected promise $2 in 3');
    }, 1000);
  })
    .then(success => {
      console.log(success);
    })
    .catch(error => {
      console.log(error);
    });
  console.log(promise);
  // return promise;
}
