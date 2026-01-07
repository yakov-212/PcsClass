import { NavLink } from "react-router";
export default function Header(props){
    return(
        <>
            <header>
                <h1>{props.txt}</h1>
                {props.txt !== 'Blogs' && <NavLink to="/"><h2 style={{textAlign:'start',paddingLeft:'10px'}}>Blogs</h2></NavLink>}
            </header>
            <hr/>
        </>
    )
}