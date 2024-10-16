const getAllUsers = async function(search,page,limit,sort){

    try {
        const response = await fetch(`http://localhost:1111/admin/users?search=${search}&page=${page}&limit=${limit}&sort=${sort}`,{
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}


const toggleUserStatus = async function(userId){
    try {
        const response = await fetch(`http://localhost:1111/admin/users/${userId}`,{
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}


const updateUserProfile = async function(userId, profile){
    try {
        const response = await fetch(`http://localhost:1111/auth/profile/${userId}`,{
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profile)
        }
        )
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}


export {getAllUsers, toggleUserStatus , updateUserProfile}