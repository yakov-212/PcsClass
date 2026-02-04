'use strict';
let total = 0;
let args = ''
process.argv.forEach(val =>{
    if(typeof Number(val) === 'number' && !isNaN(Number(val))){
        total += Number(val);
    }
})
console.log(total);