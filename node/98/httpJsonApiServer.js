'use strict'
const http = require('http')
const fs = require('fs')
http.createServer((req,res) =>{
    if (req.method !== 'GET') return res.end();
    const obj = new URL(req.url,'http://example.com')
    const time = new Date(obj.searchParams.get('iso'))
    let result;
    
    obj.parsetime = time =>{
        return {hour: time.getHours(),minute:time.getMinutes(),second:time.getSeconds()}
    }
    obj.unixtime = time =>{return{unixtime:time.getTime()}}

    if (obj.pathname === '/api/parsetime') {
        result = obj.parsetime(time)
    } 
    else if (obj.pathname === '/api/unixtime') {
        result = obj.unixtime(time)
    }

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(result))

}).listen(process.argv[2])