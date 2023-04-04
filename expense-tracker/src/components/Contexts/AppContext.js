import React from "react"
import { useState } from "react";
export const AppContext = React.createContext({
    idToken:'',
    isLoggedIn:false ,
    setidToken:()=>{},
    setIsLoggedIn:()=>{},

});

const ContextProvider = (props)=>{
    const[isLoggedIn , setIsLoggedIn] = useState(false);
    const[idToken , setidToken] = useState('')

    
    const ctxObj = {
        idToken:idToken,
        isLoggedIn:isLoggedIn ,
        setidToken:setidToken ,
        setIsLoggedIn:setIsLoggedIn,
    
    }

    return   <AppContext.Provider value = {ctxObj}>{props.children}</AppContext.Provider> 
}

export default ContextProvider ;
