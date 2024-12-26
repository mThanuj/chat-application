import {createContext} from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const login = async()=>{
        console.log("Login");
    }

    const logout = async()=>{

    }

    const refreshToken = async()=>{

    }

    return (
        <AuthContext.Provider value={{login,logout,refreshToken}}>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthProvider,AuthContext};