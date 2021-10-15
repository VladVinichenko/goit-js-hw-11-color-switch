const refs = {
  body: document.querySelector('body'),
  start: document.querySelector('[data-action="start"]'),
  stop: document.querySelector('[data-action="stop"]'),
};

const colors = ['#FFFFFF', '#2196F3', '#4CAF50', '#FF9800', '#009688', '#795548'];

function colorSwitcher(arr) {
  let started = false; //started timer
  let timerId = null;
  const randomIntegerFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  refs.start.addEventListener('click', start);

  function colorSwitch() {
    refs.body.style.backgroundColor = `${arr[randomIntegerFromInterval(0, arr.length - 1)]}`;
  }

  function start() {
    if (!started) {
      timerId = setInterval(colorSwitch, 1000);
      started = true;
      disabledButtons();
      refs.stop.addEventListener('click', stop);
      refs.start.removeEventListener('click', start);
    }
  }

  function stop() {
    if (started) {
      clearInterval(timerId);
      started = false;
      disabledButtons();
      refs.start.addEventListener('click', start);
      refs.stop.removeEventListener('click', stop);
    }
  }

  function disabledButtons() {
    // disabled\acticated buttons
    if (started) {
      refs.start.setAttribute('disabled', true);
      refs.stop.removeAttribute('disabled');
      return;
    } else if (!started) {
      refs.start.removeAttribute('disabled');
      refs.stop.setAttribute('disabled', true);
      return;
    }
  }

  function initPage() {
    //start settings on download page
    disabledButtons();
    refs.body.style.backgroundColor = `${arr[0]}`;
  }

  initPage(); //set start settings on download page
}

colorSwitcher(colors); //start script. (array with colors)
