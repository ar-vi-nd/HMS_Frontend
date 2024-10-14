import React,{useContext, useState} from 'react'
import { Profile } from '../components'
import { UserContext } from '../context/userContext'
import { ToastContainer, toast } from 'react-toastify'
import { updateUserProfile } from '../services/user.service'

const ProfilePage = () => {

    const { user, login } = useContext(UserContext)
    const handleUpdate = async (userId,data)=>{
        console.log(userId,data)
        try {
            const updatedUser = await updateUserProfile(userId,data)
            if(!updatedUser){
                toast.error('Failed to update user')
                return
            }else{
                login(updatedUser?.data?.user)
            }
            
        } catch (error) {
            toast.error("Failed to Update Profile")
        }
    }
  return (
    <div>
        <Profile user={user} onUpdate={handleUpdate} />
        <ToastContainer/>
      
    </div>
  )
}

export default ProfilePage
