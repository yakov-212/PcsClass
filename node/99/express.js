import express from 'express';
import numberCheck from './numberCheck.js';
import applySymbol from './applySymbol.js';

const app = express()
app.use(numberCheck)
app.get('/add',(req,res,next)=>{
    res.write('<h1>Add</h1>')
    
    res.end(`<h2>${req.num1 + req.num2}</h2>`)
})
app.get('/subtract',(req,res,next)=>{
    res.write('<h1>Subtract</h1>')
    res.end(`<h2>${req.num1 - req.num2}</h2>`)
})
app.get('/:symbol',(req,res,next)=>{
    res.end(applySymbol(req.params.symbol,req.num1,req.num2))
})
app.listen(80);

