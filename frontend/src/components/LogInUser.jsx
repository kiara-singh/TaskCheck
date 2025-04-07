import { verifyUser } from "../api"
import {useState} from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";



export function LogInUser(){

    const navigate=useNavigate();

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
        if(response){
            sessionStorage.setItem("User", response); 
            //making authorisation field in all axios request
            axios.defaults.headers.common["authorization"] = `Bearer ${response}`;
            navigate("/home")
        }else{
           alert("Log in failed"); 
        }


    }

    return(
        <form onSubmit={handleCreation}>
            <input placeholder={"Email"} onChange={handleChange} name="email" required maxLength={50}/>
            <input placeholder={"Password"} onChange={handleChange} name="password" type="password" required maxLength={25}/>
            <button type="submit">Log In</button>
        </form>
        
    )
}