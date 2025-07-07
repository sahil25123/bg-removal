import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import { createContext } from "react";
import axios from "axios";


 export const AppContext = createContext() ;

 const AppContextProvider = (props) => {
    const [credit , setCredit] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const {getToken} = useAuth() ; 

    const loadCreditsData = async () =>{
        try {
            const token  = await getToken();
            const {data} = await axios.get(backendUrl)

        }
        catch(e){
            console.log(e.message);

        }
    }

    
    const value = {


    }
    return (
        <AppContext.Provider value={value}>
            {props.childer}
        </AppContext.Provider>
    )

 }

export default AppContextProvider;

