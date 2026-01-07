import {BrowserRouter,Routes,Route} from 'react-router'
import './App.css'
import Home from './Home'
import Blogs from './Blogs'
import Posts from './Posts'
import Comments from './Comments'
import ErrorPage from './ErrorPage'

function App() {




  return (
    <>
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home></Home>}>
          <Route index element={<Blogs ></Blogs>}/>

          <Route path='blogs/:id/:name' element={<Posts></Posts>} >
            <Route index element={<Comments></Comments>}></Route>
          </Route>
        </Route>

        <Route path='*' element={<ErrorPage></ErrorPage>}/>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
