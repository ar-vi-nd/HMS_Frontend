import React from 'react'

const UserItem = ({user,toggleStatus}) => {
  return (
        <tr className="hover:bg-gray-100">
      <td className="py-2 px-4 border border-gray-300 text-center">{user.name}</td>
      <td className="py-2 px-4 border border-gray-300 text-center">{user.email}</td>
      <td className="py-2 px-4 border border-gray-300 text-center">{user.status}</td>
      <td className="py-2 px-4 border border-gray-300 text-center flex justify-center space-x-2">
      
        <button 
          onClick={() => toggleStatus(user._id)} 
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Toggle Status
        </button>
      </td>
    </tr>
  )
}

export default UserItem
