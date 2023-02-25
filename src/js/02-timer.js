import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const startTime = Date.now();
    const [selectedTime] = selectedDates.getTime();
    if (selectedTime <= startTime) {
      Notiflix.Notify.failure('Please choose a date in the future');
      buttonStartCountEl.disabled = true;
      return;
    }
    buttonStartCountEl.disabled = false;
  },
  isActive: false,
};

const inputPickerEl = document.querySelector('#datetime-picker');
const buttonStartCountEl = document.querySelector('button[data-start]');
const spanSelectionEl = document.querySelectorAll('.value');

flatpickr(inputPickerEl, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

buttonStartCountEl.addEventListener('click', onButtonClck);

function onButtonClck() {
  if (options.isActive) {
    return;
  }
  const date = new Date(inputPickerEl.value);
  const timeInterval = setInterval(() => {
    options.isActive = true;
    const currentTime = Date.now();
    const timeSubtraction = date.getTime() - currentTime;
    const refreshTime = addLeadingZero(convertMs(timeSubtraction));
    const timeArr = Object.values(refreshTime);
    // timerUpdate(timeArr);
    const spanArr = Array.from(spanSelectionEl);
    for (let index = 0; index < spanArr.length; index++) {
      spanArr[index].textContent = timeArr[index];
    }
    if (timeSubtraction <= 999) {
      clearInterval(timeInterval);
    }
  }, 1000);
}

// function timerUpdate(timeArr) {
//   const spanArr = Array.from(spanSelectionEl);
//   for (let index = 0; index < spanArr.length; index++) {
//     spanArr[index].textContent = timeArr[index];
//   }
// }
