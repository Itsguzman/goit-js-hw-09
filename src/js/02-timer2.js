// Described in documentation
import flatpickr from 'flatpickr';
// Additional styles import
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const timeMe = {
  datetimePicker: document.getElementById('datetime-picker'),
  startPick: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hrs: document.querySelector('span[data-hours]'),
  min: document.querySelector('span[data-minutes]'),
  sec: document.querySelector('span[data-seconds]'),
};

timeMe.startPick.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
      timeMe.startPick.disabled = true;
      return;
    }
    timeMe.startPick.disabled = false;
    let intervalId = null;
    timeMe.startPick.addEventListener('click', countNow);

    function countNow() {
      timeMe.startPick.disabled = true;
      timeMe.datetimePicker.disabled = true;

      intervalId = setInterval(() => {
        if (selectedDates[0] < Date.now()) {
          clearInterval(intervalId);
          timeMe.datetimePicker.disabled = false;
          return;
        }
        const timeDiff = selectedDates[0] - Date.now();

        const { days, hours, minutes, seconds } = convertMs(timeDiff);
        timeMe.days.textContent = addZero(days);
        timeMe.hrs.textContent = addZero(hours);
        timeMe.min.textContent = addZero(minutes);
        timeMe.sec.textContent = addZero(seconds);
      });
    }
  },
};

flatpickr(timeMe.datetimePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addZero(num) {
  return String(num).padStart(2, '0');
}
