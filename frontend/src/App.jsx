import { useState, useEffect } from 'react'
import {HashRouter as Router, Routes, Route} from "react-router-dom"
import {getTasks, getTask, createTask, updateTask, deleteTask} from './api'
import { Home } from './pages/Home'
import {Login} from './pages/Login'
import { Register } from './pages/Register'
import axios from 'axios'

import './App.css'

function App() {

  useEffect(()=>{
    let token=sessionStorage.getItem("User");
    if(token){
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    }
  },[])
 

  //Pages
  //register page
  //home page (list of user's task) and can create a task
  //login page 


  return (
    <>
    <Router>
      <Routes>
        <Route path="/home" element={<Home/>}/> 
        <Route path="/" element={<Login/>}/> 
        <Route path="/register" element={<Register/>}/> 
      </Routes>

      
    </Router>
    </>
  )
}

export default App
