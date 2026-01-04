import './App.css'
import {createBrowserRouter,Outlet,Link,useLocation} from 'react-router' 
import {RouterProvider} from 'react-router'
import Sell from './Sell'
import Buy from './Buy'

function App() {

  const Title = () =>{
    const loc =  useLocation()
    const getTitle = (pathname) => {
      let title
      switch(pathname){
        case '/':
          title = 'Home Page'
          break;
        case '/sell':
          title = 'Sell Page'
          break;
        case '/buy':
          title = 'Buy Page'
          break;
        default:
          title = 'Error Page'
          break
        
      }
      return title;
    };
    return <h1>{getTitle(loc.pathname)}</h1>
  }
  
  
  const router = createBrowserRouter(
    [
      {
        path:'/',
        element: 
                <>
                  <Title/>
                  <Link to='/'>Home</Link> |{/* 
                  */} <Link to='/buy'>Buy</Link> |{/* 
                  */} <Link to='/sell'>Sell</Link> |{/* 
                  */} <Link to='/error'>Error</Link>
                  <hr />
                  <Outlet/>
                </>,
        children:
                [
                  {
                    index:true,
                    element:<div>This is the home Page</div>
                  },
                  {
                    path:'/buy',
                    element:<Buy/>
                  },
                  {
                    path:'/sell',
                    element: <Sell/>
                  },
                  {
                    path: '*',
                    element:<h1>Error 404 Page Not Found</h1>
                  }
                ]
      }
    ]
  )
  
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}


export default App
