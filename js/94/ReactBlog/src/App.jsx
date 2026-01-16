import {BrowserRouter,Routes,Route,Navigate} from 'react-router'
import './App.css'
import {useState} from 'react'
import Home from './Home'
import Blogs from './Blogs'
import Posts from './Posts'
import Comments from './Comments'
import ErrorPage from './ErrorPage'
import Login from './Login'

function App() {


    const [loggedInUser,setLoggedInUser] = useState('');
    const loggedIn = JSON.parse(localStorage.getItem('loggedIn'))

  return (
    <>
    <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login setLoggedInUser={setLoggedInUser}></Login>}/>
            {loggedIn &&
                
                    <Route path='/blogs' element={<Home setLoggedInUser={setLoggedInUser}></Home>} >
                        <Route index element={<Blogs ></Blogs>}/>
                        <Route path='/blogs/:id/:name' element={<Posts></Posts>} >
                            <Route index element={<Comments loggedInUser={loggedInUser}></Comments>}></Route>
                        </Route>
                    </Route>
            }

            <Route path="*" element={loggedIn?<ErrorPage></ErrorPage>:<Navigate to={'/'} replace></Navigate>}/>
          </Routes>
          
        </BrowserRouter>
    </>
  )
}

export default App
