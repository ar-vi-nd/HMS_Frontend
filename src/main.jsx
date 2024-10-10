import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './context/userContext.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import {Home,About,Login,Signup,Hotels,Hotel,BookingDetailsPage,Admin, AdminDash, AdminHotMng, AdminUsrMng, AdminBookMng} from './pages'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // Add your routes here
      {
        path: "",
        element: <Home/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/services",
        element: <h1>Services Page</h1>
      },
      {
        path: "/contact",
        element: <h1>Contact Page</h1>
      },
      {
        path:'/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element:<Signup/>
      },
      {
        path: '/hotels',
        element: <Hotels/>
      },
      {
        path: '/hotels/:hotelId',
        element: <Hotel/>
      },
      {
        path: '/booking/:bookingId',
        element: <BookingDetailsPage/>
      },
      {
        path: "/admin",
        element: <Admin/>,
        children:[
          {
            path: "",
            element: <AdminDash/>
          },
          {
            path: "/admin/booking",
            element: <AdminBookMng/>
          },
          {
            path: "/admin/hotel",
            element: <AdminHotMng/>
          },
          {
            path: "/admin/user",
            element: <AdminUsrMng/>
          }
        ]
      }

    ]
  }
])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <UserProvider>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
    </UserProvider>
  // </StrictMode>,
)
