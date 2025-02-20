
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext<any>(null)

const GlobalProvider = ({children}:{children: any}) => {
    const [openHeaderSidebar, setOpenHeaderSidebar] = useState(true)

    useEffect(()=>{
        if(window.innerWidth <= 860){
            setOpenHeaderSidebar(false)
        }
    }, [window.innerWidth])

    const toggleHeaderSidebar = () => {
        setOpenHeaderSidebar(!openHeaderSidebar)
    }
    
    return (
        <GlobalContext.Provider value={{
            openHeaderSidebar,
            toggleHeaderSidebar
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider
