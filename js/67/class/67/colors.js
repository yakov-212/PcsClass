(function () {
  'use strict';


  const color = document.querySelector('#color');
  const bgcolor = document.querySelector('#bgcolor');

  color.addEventListener('change', () => {
    document.body.style.color = color.value;
  });

  bgcolor.addEventListener('input', () => {
    document.body.style.backgroundColor = bgcolor.value;
  });

  /*document.querySelector('#name').addEventListener('change', function () {
    console.log(this.value);
  });*/
}());
