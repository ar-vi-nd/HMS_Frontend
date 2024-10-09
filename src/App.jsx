import { useContext, useEffect, useState } from 'react'
import './App.css'
import { UserContext } from './context/userContext'
import { Outlet } from 'react-router'
import { Header,Footer } from './components'

function App() {
  const {login,logout} = useContext(UserContext)

  useEffect(()=>{
    const user = localStorage.getItem('userContext')
    if(user){
      login(JSON.parse(user))
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
