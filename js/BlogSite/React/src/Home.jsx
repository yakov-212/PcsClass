import Header from './Header'
import {Outlet,useParams} from 'react-router'
export default function Home(){

    const {name} = useParams();
    return(
        <>
            <Header txt={name?`${name}'s Posts`:"Blogs"}></Header>
            <Outlet></Outlet>
        </>
    )
}