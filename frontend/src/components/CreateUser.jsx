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

    return (
        <form onSubmit={handleCreation} className="flex flex-col items-center gap-4 p-6 max-w-md w-full mx-auto">
          <input
            placeholder="Username"
            onChange={handleChange}
            name="username"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            placeholder="Email"
            onChange={handleChange}
            name="email"
            required
            maxLength={50}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            placeholder="Password"
            onChange={handleChange}
            name="password"
            type="password"
            required
            maxLength={25}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Account
          </button>
        </form>
      );
      
}