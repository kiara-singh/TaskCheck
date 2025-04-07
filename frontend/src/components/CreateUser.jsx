import { createUser } from "../api"
import {useState} from "react"

export function CreateUser(){
    const[user,setUser]=useState({
        username:"",
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

        let response=await createUser(user);
        if (response.status!==200){
            alert("User account creation error")
        }
        console.log("user created", response)

    }

    return(
        <form onSubmit={handleCreation}>
            <input placeholder={"Username"} onChange={handleChange} name="username" required/>
            <input placeholder={"Email"} onChange={handleChange} name="email" required maxLength={50}/>
            <input placeholder={"Password"} onChange={handleChange} name="password" type="password" required maxLength={25}/>
            <button type="submit">Create Account</button>
        </form>
        
    )
}