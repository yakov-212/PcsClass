import Header from './Header'
import {Outlet,useParams} from 'react-router'
export default function Home(props){

    const {name} = useParams();
    return(
        <>
            <Header txt={name?`${name}'s Posts`:"Blogs"} login={false} setLoggedInUser={props.setLoggedInUser}></Header>
            <Outlet></Outlet>
        </>
    )
}