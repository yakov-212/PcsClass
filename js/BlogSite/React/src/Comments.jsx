import FetchList from "./FetchList"
import { useState } from "react"
import { useParams } from "react-router";
export default function Comments(){
    const [show,setShow] = useState(false);
    const {id} = useParams();
    return(
        <>
            <button onClick={() => setShow(!show)}>{show ? "Hide Comments" : "Show Comments"}</button>
            {show && <FetchList Component={Component} url={`https://jsonplaceholder.typicode.com/comments?postId=${id}`}/>}
        </>
    )
}
const Component = ({data}) => {
    return (
        <div style={{textAlign: 'start'}}>
            <ul>
                {data.map((comment) => (
                    <li key={comment.id}>
                        <b>{comment.name}</b>
                        <br />
                        {comment.body}
                    </li>
                ))}
            </ul>
        </div>
    )
}