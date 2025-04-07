import { useState, useEffect } from 'react'
import {HashRouter as Router, Routes, Route} from "react-router-dom"
import {getTasks, getTask, createTask, updateTask, deleteTask} from './api'
import { Home } from './pages/Home'
import {Login} from './pages/Login'
import { Register } from './pages/Register'

import './App.css'

function App() {

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
