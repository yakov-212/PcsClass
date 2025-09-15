window.pcs = function (selector) {
  'use strict';

  function getElement(selector) {
    return document.querySelector(selector);
  }

  function setCss(element, property, value) {
    //console.log('in setCss', property);
    element.style[property] = value;
  }

  function getCss(element, property) {
    //return element.style[property];
    return getComputedStyle(element)[property];
  }

  function on(element, event, callback) {
    element.addEventListener(event, callback);
  }

  function sparkle(time,speed = 100){
    let og = getCss(element,"color");
    let r = 0;
    let g = 0;
    let b = 0;
    let increment = 50;
    let interval = setInterval(() =>{
      if ((r += increment) >= 256) {
        r = 0;

        if ((g += increment) >= 256) {
          g = 0;

          if ((b += increment) >= 256) {
            b = 0;
          }
        }
      }

      element.style.color = `rgb(${r}, ${g}, ${b})`;
      
    },speed);
    let stopInterval = setInterval(() => {
      clearInterval(interval);
      interval = null;
    },time)
    console.log(og);

    // this should work but it doesn't no idea why
    setCss(element,"color",og);
  }

  const element = getElement(selector);

  return {
    // getElement: getElement,
    /*setCss,
    getCss,*/
    css: function (property, value) {
      if (arguments.length === 1) {
        return getCss(element, property);
      } else {
        return setCss(element, property, value);
      }
    },
    on: (event, callback) => {
      on(element, event, callback);
    },
    click: (callback) => on(element, 'click', callback),
    hide: () => setCss(element,"display","none"),
    show: () => setCss(element,"display","inline-block"),
    sparkle,
  };
};
