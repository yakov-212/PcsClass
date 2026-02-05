export default (symbol,n1,n2)=>{
    switch(symbol){
        case '+':
            return res(n1+n2)
        case '-':
            return res(n1-n2)
        case 'x':
            return res(n1*n2)
        case '/':
        case 'd':
            symbol = '/'
            return res(n1/n2)
        default:
            return '<h1>404 - not found</h1>'
    }
    function res(eq){
        return `<h1>${n1} ${symbol} ${n2} = ${eq}</h1>`
    }
}
