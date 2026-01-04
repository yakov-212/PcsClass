import './App.css'
import {createBrowserRouter,Outlet,Link} from 'react-router' 
import {RouterProvider} from 'react-router'
import Title from './Title'
function App() {

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
                    element:<div>Here is where there would be many houses to choose from to buy</div>
                  },
                  {
                    path:'/sell',
                    element: <div>Here is where you would be able to put your house on the market</div>
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
