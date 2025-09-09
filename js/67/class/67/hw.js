(function () {
  'use strict';

  let numButtons = 1;

  const buttonDiv = document.querySelector('#buttonDiv');

  console.log(document.body.div, document.body.children[0]);
  function handleButtonClick(e) {
    e.stopPropagation();

    /*if (e.target === buttonDiv) {
      return;
    }*/

    if (e.target.nodeName !== 'BUTTON') {
      return;
    }

    const newButton = document.createElement('button');
    newButton.innerText = ++numButtons;
    //document.body.appendChild(newButton);
    buttonDiv.appendChild(newButton);

    //document.body.innerHTML += `<button>${++numButtons}</button>`;

    //newButton.addEventListener('click', handleButtonClick);

    // this.removeEventListener('click', handleButtonClick);

    /*switch (e.target.innerText) {
      case '1':
        console.log('do button one stuff');
        break;
      case '2':
        console.log('do button two stuff');
        break;
      case '3':
        console.log('do button three stuff');
        break;
      default:
        console.log('do other button stuff');
        break;
    }*/

    console.log(`would load order #${e.target.innerText}`);
  }

  document.querySelector('#theButton').addEventListener('click', handleButtonClick);

  buttonDiv.addEventListener('click', handleButtonClick);

  document.body.addEventListener('click', () => console.log('body got click'));
}());
