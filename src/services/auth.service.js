const userSignup = async ({ email, password, name , phoneNo }) => {
    try {
        console.log(email, password, name)
        const response = await fetch(`http://localhost:1111/auth/register`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: password, name: name , phoneNo: phoneNo})
        });

        const jsondata = await response.json()

        console.log(jsondata)
        return jsondata

    } catch (error) {

        console.log("error signing up, ", error)

    }
}

const userLogin = async ({ email, password }) => {
    try {
        console.log(email, password)
        const response = await fetch(`http://localhost:1111/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            credentials: "include",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ email: email, password: password })
        });

        const jsondata = await response.json()

        console.log(jsondata)
        return jsondata

    } catch (error) {

        console.log("error logging in, ", error)

    }
}

const userLogout = async()=>{
    try {
        const response = await fetch(`http://localhost:1111/auth/logout`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            credentials: "include",
            headers: {
                "Content-Type": "application/json",

            }
        });

        const jsondata = await response.json()

        console.log(jsondata)
        return jsondata

    } catch (error) {

        console.log("error logging out, ", error)

    }
}

const adminLogin =  async ({ email, password }) => {
    try {
        console.log(email, password)
        const response = await fetch(`http://localhost:1111/admin/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            credentials: "include",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ email: email, password: password })
        });

        const jsondata = await response.json()

        console.log(jsondata)
        return jsondata

    } catch (error) {

        console.log("error logging in, ", error)

    }
}

export { userSignup, userLogin , userLogout, adminLogin}