import { createContext ,useEffect,useState} from "react";

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isLoggedIn,setIsLoggedIn] = useState(false)

    const login = async (user) => {

        setUser(user);
        setIsLoggedIn(true);

    }

    const logout = ()=>{
        setUser({});
        setIsLoggedIn(false);
       localStorage.removeItem('userContext');
    }

    useEffect(()=>{
      let token = localStorage.getItem('token');
      if(token){
        login()
      }
    },[])


   
    return (
      <UserContext.Provider value={{user,isLoggedIn,login,logout}}>
        {children}
      </UserContext.Provider>
    );
   };
   

   export { UserContext, UserProvider };

