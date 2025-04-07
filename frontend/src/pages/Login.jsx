import { CreateUser } from "../components/CreateUser"
import { LogInUser } from "../components/LogInUser"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export function Login(){

    const [see,setSee]=useState(true);


    return(
        <>
            {!see ?
            <>
                 <LogInUser> </LogInUser>
                 <button onClick={()=>setSee(true)}>Sign Up</button>
                 
            </>:
            <>
                 <CreateUser> </CreateUser>
                 <button onClick={()=>setSee(false)}>Click here to log in</button>
            </>}
        </>
    )
}