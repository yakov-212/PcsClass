import {Outlet,useParams} from "react-router"
import FetchList from "./FetchList";
export default function Posts(){
    const {id} = useParams();
    return(
        <FetchList Component={Component} url={`https://jsonplaceholder.typicode.com/posts?userId=${id}`} />
    )
    
}

const Component = ({data}) => {
        return (
            <>
                <ul style={{textAlign: 'start'}}>
                    {data.map((post) => (
                        <> 
                            <li key={post.id} >
                                <b>{post.title}</b>
                                <br/>&ensp;{post.body}
                            </li>
                            <br></br>
                        </>
                    ))}
                </ul>
                <Outlet></Outlet>
            </>
        );
    }