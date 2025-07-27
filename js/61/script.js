/*use strict*/
function toFrnh (num){
    answer = Math.round((((num/5)*9+32)*100))/100;
    return `${num}f = ${answer}c`;
}
function toCel (num){
    answer = Math.round((((num-32)*5/9)*100))/100;
    return `${num}f = ${answer}c`;
}

console.log(toFrnh(32),toFrnh(9));
console.log(toCel(32),toCel(9));
let frnh = prompt("give me a temp in farnheit to convert")
while (!validateInput(parseFloat(frnh))){
    frnh = prompt("give me a temp in farnheit to convert")
}
alert(toCel(frnh))

function multiply (x ,y){
    return x*y;
}

console.log(multiply(2,2));

function getMultiplyer(){
    return multiply;
}

let mult = getMultiplyer();
console.log(mult(3,3));

function getBetterMultiplyer(x){
    return function betterMultiplyer(y){
        return x*y;
    }
}

let multiplyByFive = getBetterMultiplyer(5);
console.log(multiplyByFive(5));

const tempForm = document.getElementById('temp-converter');
const frnhInput = document.getElementById('frnh');
const celInput = document.getElementById('cel');
const frnhAnswer = document.getElementById('frnh-answer');
const celAnswer = document.getElementById('cel-answer');
function validateInput(value) {
    const numberRegex = /^-?\d*\.?\d*$/;

    if (!numberRegex.test(value)) {
        alert("Validation Error: Input contains invalid characters.");
        return false;
    }

    const num = parseFloat(value);

    if (num < -40 || num > 110) {
        alert("Validation Error: Number is outside the valid range of -40 to 110.");
        return false;
    }

    return true;
}
tempForm.addEventListener('submit', function(event) {

  event.preventDefault(); 
  const frnhValue = frnhInput.value;
  const celValue = celInput.value;

  if (frnhValue !== '' && validateInput(parseFloat(frnhValue))) {
    frnhAnswer.textContent = toCel(parseFloat(frnhValue));
  } else {
    frnhAnswer.textContent = '...';
  }

  if (celValue !== '' && validateInput(parseFloat(frnhValue))) {
    celAnswer.textContent = toFrnh(parseFloat(celValue));
  } else {
    celAnswer.textContent = '...';
  }

  frnhInput.value = '';
  celInput.value = '';
});
