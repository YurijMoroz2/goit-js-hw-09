// es modules are recommended, if available, especially for typescript
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// // // ------------------------------------------------------------
const selectors = {
 dateInput:document.querySelector('#datetime-picker'),
btn:document.querySelector('button[data-start]'),
days:document.querySelector('[data-days]'),
hours:document.querySelector('[data-hours]'),
minutes:document.querySelector('[data-minutes]'),
seconds:document.querySelector('[data-seconds]')
};
const timerContainer = document.querySelector('.timer');
const valueElements = document.querySelectorAll('.value');
const fi = document.querySelectorAll('.field');
const la = document.querySelectorAll('.label')
fi.forEach((element) => {
   element.style.display = 'flex';
   element.style.justifyContent ='center'; 
   element.style.flexDirection = 'column';
  });
valueElements.forEach((element) => {
    element.style.display = 'flex';
   element.style.justifyContent ='center';
  element.style.fontSize = '42px';
});
la.forEach((element) => {
    element.style.display = 'flex';
    element.style.justifyContent ='center'; 
       });

  timerContainer.style.display = 'flex';
  timerContainer.style.justifyContent = 'space-between';
timerContainer.style.margin = '6px';
timerContainer.style.width = '230px'

selectors.btn.disabled = true;
// // // =============================================================
let  externalSelectedDate
// // // ========================================================
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
                //  console.log(selectedDates[0]);
                 externalSelectedDate = selectedDates[0];
    if(externalSelectedDate<=options.defaultDate){
    window.alert("Please choose a date in the future")    
}else{
    selectors.btn.disabled = false;
};
    },
  };
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const fr = flatpickr( selectors.dateInput, options);
  console.log("hello");

  // Add a click
  selectors.btn.addEventListener("click", () => {
    
      console.log('externalSelectedDate', externalSelectedDate);

    const countdownTimer = setInterval(() => {
    
    const now = new Date().getTime();
    
        const ms =  externalSelectedDate - now;
      
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
              };
              const { days, hours, minutes, seconds } = convertMs(ms)
           
    // Display the values in the timer
    selectors.days.textContent = addLeadingZero(days);
   selectors.hours.textContent = addLeadingZero(hours);
   selectors.minutes.textContent = addLeadingZero(minutes);
    selectors.seconds.textContent = addLeadingZero(seconds);

    // If the countdown is finished, display "Expired"
    if (ms < 0) {
      clearInterval(countdownTimer);
      timerContainer.textContent = "Expired";
    }
}, 1000);
    function addLeadingZero(value) {
        return `${value}`.padStart(2, '0');
      }
});