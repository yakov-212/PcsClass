import { useNavigate } from 'react-router';
import Header from './Header.jsx';
import {useState} from 'react';
export default function Login({setLoggedInUser}){
    
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const [users,setUsers] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [txt,setTxt] = useState('');

    function signUpHandler(){
        let stop = false;
        Object.values(users).forEach((user)=>{
            if(email === user.email){
                setTxt('User already exists. Please login.');
                stop = true;
                return;
            }
        });
        if(stop) return;
        const newUsers = {...users};
        newUsers[email] = {email,password};
        setUsers(newUsers);
        localStorage.setItem('user',JSON.stringify(newUsers));
        setLoggedInUser(email);
        setTxt('');
        navigate('/blogs');
        localStorage.setItem('loggedIn','true');
        
    }
    function loginHandler(){
        let found = false;
        let oneFound = false;
        Object.values(users).forEach((user)=>{
            if(email === user.email && password === user.password){
                navigate('/blogs');
                found = true;
                setLoggedInUser(email);
                setTxt('');
                localStorage.setItem('loggedIn','true');
                return
            }
            else if(email === user.email || password === user.password){
                setTxt('Email or password is incorrect.');
                oneFound = true;
                return;
            }
        });        
        if(!found && !oneFound){
            setTxt('Email and password do not exist. Please sign up.');
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        switch(e.nativeEvent.submitter.value){
            case 'L':
                loginHandler();
                break;
            case 'S':
                signUpHandler();
                break;
            default:
                break;
        }
    }
    return(
        <div>
            <Header txt="Login" login={true}></Header>
            <form onSubmit={handleSubmit}>

                <input type="email" placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)}/><br/><br/>
                <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}
                        minLength={8} pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}' required
                        title='Must contain at least one number, uppercase, lowercase, and 8 or more characters'/><br/><br/>

                <button type='submit' value='L' style={{marginRight:'15px'}}>Login</button>
                <button type='submit' value='S' >Sign Up</button>
            </form>
            <div style={{color:'red',paddingTop:'10px'}}>{txt}</div>
        </div>
    )
}
