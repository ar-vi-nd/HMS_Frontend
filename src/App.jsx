import { useContext, useEffect, useState } from 'react'
import './App.css'
import { UserContext } from './context/userContext'
import { Outlet } from 'react-router'
import { Header,Footer } from './components'
import { useNavigate } from'react-router-dom'

function App() {
  const {login,logout} = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(()=>{
    const user = localStorage.getItem('userContext')
    if(user){
      const parsedUser = JSON.parse(user)
      if(parsedUser.isAdmin){
        navigate('/admin')
      }else{
        login(parsedUser)
      }
    }else{
      logout()
    }
  },[])

  return (
    <>
    <Header></Header>
    <Outlet/>
    <Footer></Footer>
    </>
  )
}

export default App
