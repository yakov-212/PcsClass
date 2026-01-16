import { NavLink } from "react-router";
export default function ErrorPage(){
    return(
        <>
            <h1>404 Page Not Found</h1>
            <hr/>
            <NavLink to="/"><h2>Go Home</h2></NavLink>
        </>
    )
}