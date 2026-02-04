'use strict'
const http = require('http')
const fs = require('fs')
http.createServer((req,res) =>{
    const src = fs.createReadStream(process.argv[3],'utf-8')
    src.pipe(res)
}).listen(process.argv[2])