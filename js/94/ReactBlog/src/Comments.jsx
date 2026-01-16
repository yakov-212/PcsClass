import FetchList from "./FetchList"
import { useState } from "react"
import { useParams } from "react-router";

export default function Comments({loggedInUser}){
    console.log('loggedInUser in Comments:',loggedInUser);
    const [show,setShow] = useState(false);
    const {id} = useParams();
    const [comment,setComment] = useState('');
    const {name} = useParams();
    const [userComments,setUserComments] = useState(JSON.parse(localStorage.getItem(`${name} comments`)) || []);
    

    function handleClick(){
        console.log('type',Array.isArray(userComments));
        console.log('userComments',userComments);
        const maxId = userComments.reduce((max, usercomment) => {
            return usercomment.id > max ? usercomment.id : max;
        }, 0)|| 1000;
        const savedComments = [...userComments];
        savedComments.unshift({id: maxId + 1, email: loggedInUser, body: comment});
        setUserComments(savedComments);
        localStorage.setItem(`${name} comments`,JSON.stringify(savedComments));
        setComment('');
    }

    const Component = ({data}) => {
        const newData = [...userComments,...data];
        return (
            <div style={{textAlign: 'start'}}>
                <ul>
                    {newData.map((comment) => (
                        <li key={comment?.id}>
                            <b>{comment?.email}</b>
                            <br />
                            &ensp;{comment?.body}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    return(
        <>
            <button onClick={() => setShow(!show)}>{show ? "Hide Comments" : "Show Comments"}</button>
            <button style={{marginLeft:'20px'}} onClick={handleClick}>Add Comment</button>
            <input type="text" style={{marginLeft:'20px'}} onChange={(e) => setComment(e.target.value)} value={comment}/>
            {show && <FetchList Component={Component} url={`https://jsonplaceholder.typicode.com/comments?postId=${id}`}/>}
        </>
    )
}
