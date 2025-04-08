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

    return (
        <form onSubmit={handleCreation} className="flex flex-col items-center gap-4 p-6 max-w-md w-full mx-auto">
          <input
            placeholder="Email" onChange={handleChange} name="email" required maxLength={50}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-blue-500"
          />
          <input
            placeholder="Password" onChange={handleChange}name="password"type="password"required maxLength={25} minLength={8}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Log In
          </button>
        </form>
      );
      
}