import {BrowserRouter,Routes,Route} from 'react-router'
import './App.css'
import {useState} from 'react'
import Home from './Home'
import Blogs from './Blogs'
import Posts from './Posts'
import Comments from './Comments'
import ErrorPage from './ErrorPage'
import Login from './Login'
import { Navigate } from "react-router";
function App() {


    const [loggedInUser,setLoggedInUser] = useState('');

  return (
    <>
    <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login setLoggedInUser={setLoggedInUser}></Login>}/>
    
            {loggedInUser ? (
                <Route path='/blogs' element={<Home setLoggedInUser={setLoggedInUser}></Home>} >
              <Route index element={<Blogs ></Blogs>}/>
    
              <Route path='/blogs/:id/:name' element={<Posts></Posts>} >
                <Route index element={<Comments loggedInUser={loggedInUser}></Comments>}></Route>
              </Route>
            </Route>) : <Route path="*" element={<Navigate to="/" replace />} />
            }
    
            <Route path='*' element={<ErrorPage></ErrorPage>}/>
    
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
