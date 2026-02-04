'use strict';
const myMod = require('./mymodule.js')
myMod(process.argv[2],process.argv[3],(err,files)=>{
    files.forEach(f => console.log(f))
})