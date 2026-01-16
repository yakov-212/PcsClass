import FetchList from "./FetchList"
import { useState } from "react"
import { useParams } from "react-router";

export default function Comments({loggedInUser}){
    
    const [show,setShow] = useState(false);
    const {id} = useParams();
    const [comment,setComment] = useState('');
    const {name} = useParams();
    const [userComments,setUserComments] = useState(JSON.parse(localStorage.getItem(`comments`)) || {});
    

    function handleClick(){
        const currentBlogComments = userComments[name] || [];
        const maxId = currentBlogComments.reduce((max, usercomment) => {
            return usercomment.id > max ? usercomment.id : max;
        }, 0)|| 1000;
        const newComment = { id: maxId + 1, email: loggedInUser, body: comment };
        const updatedComments = {...userComments, [name]: [newComment, ...currentBlogComments]};
        setUserComments(updatedComments);
        localStorage.setItem(`comments`,JSON.stringify(updatedComments));
        setComment('');
    }

    const Component = ({data}) => {
        const existingComments = userComments[name] || [];
        const newData = [...existingComments, ...data];
        return (
            <div style={{textAlign: 'start'}}>
                <ul>
                    {newData.map((comment) => (
                        <li key={comment.id}>
                            <b>{comment.email}</b>
                            <br />
                            &ensp;{comment.body}
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
