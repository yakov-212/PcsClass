export default (req,res,next) =>{
    const url = new URL(req.url,`http://${req.headers.host}`);
    req.num1 = Number(url.searchParams.get('num1'));
    req.num2 = Number(url.searchParams.get('num2'));
    if (isNaN(req.num1) || isNaN(req.num2)){
        return res.end('<h1>Invalid Number</h1>');
    }
    res.contentType('html');
    next();
}