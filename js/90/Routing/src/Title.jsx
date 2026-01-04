import {useLocation} from 'react-router' 
export default function Title(){
    const loc =  useLocation()
    return <h1>{prettyTitle(loc.pathname)}</h1>
}

function prettyTitle(pathname){
    switch(pathname){
        case '/':
            return 'Home Page'
        case '/sell':
            return 'Sell Page'     
        case '/buy':
            return 'Buy Page'
        default:
           return 'Error Page'
    }
};