'use strict';
const http = require('http');
const results = []
let finished = 0
for (let i = 2; i< process.argv.length;i++){
    results.push('')
    http.get(process.argv[i],response=>{
    response.setEncoding('utf-8')
    response.on('data', data => results[i-2]+=data);
    response.on('end',()=>{
        if(++finished === 3)
            results.forEach(r => console.log(r))
    })
    response.on('error', e => console.error('oops2', e));

})
}

