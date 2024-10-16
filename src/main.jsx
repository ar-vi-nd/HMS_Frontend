import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './context/userContext.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import {Home,About,Login,Signup,Hotels,Hotel,BookingDetailsPage,Admin, AdminDash, AdminHotMng, AdminUsrMng, AdminBookMng, HotelFormPage, ProfilePage, BookingsPage, HotelUpdateFormPage, AdminSignin} from './pages'
import AdminHeader from './components/AdminHeader.jsx'
import { ToastContainer } from 'react-toastify'



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
        path: "/profile",
        element: <ProfilePage/>

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
        path: '/bookings/:userId',
        element: <BookingsPage/>
      },
    

    ]
  },  {
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
        path: "/admin/addhotel",
        element: <HotelFormPage/>
      },
      {
        path: "/admin/user",
        element: <AdminUsrMng/>
      },
      {
        path: "/admin/updatehotel/:hotelId",
        element: <HotelUpdateFormPage/>
      },
      {
        path: "/admin/viewhotel/:hotelId",
        element: <Hotel className={"mx-2 max-w-5xl"}/>
      },{
        path: "/admin/booking/:bookingId",
        element: <BookingDetailsPage/>
      },{
        path: "/admin/signin",
        element: <AdminSignin/>
      }
    ]
  },{
    path: "/adminsignin",
    element: <><AdminHeader/><AdminSignin/></>
  },
  {
    path: "*",
    element: <h1>Page not found</h1>
  }
])

createRoot(document.getElementById('root')).render(
  // <StrictMode>

    <UserProvider>
    <RouterProvider router={router}>
    </RouterProvider>
    <ToastContainer    position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
    </UserProvider>
  // </StrictMode>,
)
