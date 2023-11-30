const form = document.querySelector('.form');
const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const delay = parseInt(form.elements.delay.value);
  const step = parseInt(form.elements.step.value);
  const amount = parseInt(form.elements.amount.value);
  
  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay + step * i)
      .then(({position, delay}) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({position, delay}) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});