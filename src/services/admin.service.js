const getDashboardDetails= async()=>{

    try {
        const response = await fetch(`http://localhost:1111/admin/dashboard`,{
            credentials: 'include',
        })
        const data = await response.json()
        console.log(data)
        return data
        
    } catch (error) {
        console.log(error)
        
    }

}

export{getDashboardDetails}