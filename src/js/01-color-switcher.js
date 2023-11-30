  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }
  
  const startButton = document.querySelector('button[data-start]');
  const stopButton = document.querySelector('button[data-stop]');
  let intervalId;

  function changeColor() {
    document.body.style.backgroundColor = getRandomHexColor();
  };

  startButton.addEventListener('click', () => {
    startButton.disabled = true;
    intervalId = setInterval(changeColor, 1000);
  });

  stopButton.addEventListener('click', () => {
    startButton.disabled = false;
    clearInterval(intervalId);});