import React from 'react'
import UserItem from './UserItem';


const UserList = ({users, toggleStatus}) => {
    return (
        <div className="overflow-x-auto">
          {users?.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border border-gray-300 text-center">Customer Name</th>
                  <th className="py-2 px-4 border border-gray-300 text-center">Email</th>
                  <th className="py-2 px-4 border border-gray-300 text-center">Status</th>
                  <th className="py-2 px-4 border border-gray-300 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.length && users.map(user => (
                  <UserItem 
                    key={user._id} 
                    user={user} 
                    toggleStatus={toggleStatus} 
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-4 text-gray-500">No users available</div>
          )}
        </div>
      );
}

export default UserList
