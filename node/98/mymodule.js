'use strict';
module.exports = myMod
const fs = require('fs')
const path = require('path')
function myMod(dir,ext,callback){
    fs.readdir(dir,'utf-8',(err,files)=>{
        if(err){
            return callback(err)
        }
        const newExt = '.'+ext
        return callback(null,files.filter(f => path.extname(f) === newExt))
    })
}