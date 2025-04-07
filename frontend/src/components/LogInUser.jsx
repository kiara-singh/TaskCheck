import { verifyUser } from "../api"
import {useState} from "react"

export function LogInUser(){
    const[user,setUser]=useState({
        email:"",
        password:""
    })

    function handleChange(e){
        e.preventDefault(); 
        //set current user and modify name email and password
        setUser({...user, [e.target.name]: e.target.value})
    }

    async function handleCreation(e){
        e.preventDefault();

        let response=await verifyUser(user);
        console.log("user logged in", response);

    }

    return(
        <form onSubmit={handleCreation}>
            <input placeholder={"Email"} onChange={handleChange} name="email" required maxLength={50}/>
            <input placeholder={"Password"} onChange={handleChange} name="password" type="password" required maxLength={25}/>
            <button type="submit">Log In</button>
        </form>
        
    )
}