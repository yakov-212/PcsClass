(function () {
  'use strict';

  // const colors = ['red', 'white', 'blue'];
  // let index = 0;
  let interval;
  const startButton = document.querySelector('#start');

  let increment = 50;

  function start() {
    let r = 0;
    let g = 0;
    let b = 0;

    interval = setInterval(() => {
      /*document.body.style.color = colors[index++];
      if (index === colors.length) {
        index = 0;
      }
      document.body.style.backgroundColor = colors[index];*/

      //document.body.style.color = pickRandomColor();
      //document.body.style.backgroundColor = pickRandomColor();

      /*for (let r = 0; r < 256; r++) {
        for(let g = 0; g < 256; g++) {
          for(let b = 0; b < 256; b++) {
            document.body.style.color = `${r}, ${g}, ${b}`;
            document.body.style.backgroundColor = `${b}, ${g}, ${r}`;
          }
        }
      }*/

      /*if (r++ === 256) {
        r = 0;

        if (g++ === 256) {
          g = 0;

          if (b++ === 256) {
            b = 0;
          }
        }
      }*/

      if ((r += increment) >= 256) {
        r = 0;

        if ((g += increment) >= 256) {
          g = 0;

          if ((b += increment) >= 256) {
            b = 0;
          }
        }
      }

      document.body.style.color = `rgb(${r}, ${g}, ${b})`;
      document.body.style.backgroundColor = `rgb(${b}, ${g}, ${r})`;

      console.log(`${r}, ${g}, ${b}`);


      //this.innerText = 'stop';
      //e.target.innerText = 'stop';
      startButton.innerText = 'stop';
    }, 100);
  }

  function stop() {
    clearInterval(interval);
    interval = null;
    //this.innerText = 'start';
    //e.target.innerText = 'start';
    startButton.innerText = 'start';
  }

  /*function getColorPart() {
    return Math.floor(Math.random() * 256);
  }

  function pickRandomColor() {
    const r = getColorPart();
    const g = getColorPart();
    const b = getColorPart();
    console.log(`rgb(${r}, ${g}, ${b})`);
    return `rgb(${r}, ${g}, ${b})`;
  }*/

  function pickRandomColor() {
    /*const randColor = Math.floor(Math.random() * 16777216);
    const hex = randColor.toString(16);
    const hexString = hex.padStart(6, '0');
    console.log(hexString);
    return `#${hexString}`;*/

    return `#${Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0') }`;
  }

  startButton.addEventListener('click', /*function()*/e => {
    if (!interval) {
      start();
    } else {
      stop();
    }
  });
}());
