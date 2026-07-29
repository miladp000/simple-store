/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

export interface AuxProps  { 
    children: React.ReactNode
 }

export const ThemeContext = createContext({});

export const ThemeProvider = ({children}:AuxProps)=>{
    const [isDark , setDark] = useState<boolean>(false);

    const toggleTheme=():void=>{
        setDark(!isDark);
        document.documentElement.classList.toggle('dark')
    }

    return <ThemeContext.Provider value={{isDark , toggleTheme }}>
        {children}
    </ThemeContext.Provider>
}
export const useTheme = ()=>{
    const context = useContext(ThemeContext);
    if(!context){
        throw new Error("useTheme must be used in ThemeProvider children");
    }
    return context;
}