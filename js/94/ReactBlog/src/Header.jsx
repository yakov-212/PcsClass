import { NavLink } from "react-router";
export default function Header({txt,login,setLoggedInUser}){
    return(
        <>
            <header>
                <h1>{txt}</h1>
                {!login && <div style={{display:'flex',justifyContent:'space-between',padding:'0 20px'}}>
                    <NavLink to="/blogs"><h2>Blogs</h2></NavLink>
                    <NavLink to={'/'} replace><h3 onClick={()=>{setLoggedInUser(null);localStorage.setItem('loggedIn','false');}}>LogOut</h3></NavLink>
                </div>}
            </header>
            <hr/>
        </>
    )
}