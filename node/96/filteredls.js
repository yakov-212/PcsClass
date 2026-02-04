'use strict';
const fs = require('fs');
const path = require('path')
const dir = process.argv[2];
const ext = '.' + process.argv[3];

fs.readdir(dir,'utf-8',(err,files)=>{
    files.filter(f => path.extname(f) === ext).forEach(f => console.log(f))
})