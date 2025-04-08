import { useState, useEffect } from 'react'
import {HashRouter as Router, Routes, Route} from "react-router-dom"
import {getTasks, getTask, createTask, updateTask, deleteTask} from './api'
import { Home } from './pages/Home'
import {Login} from './pages/Login'
import axios from 'axios'
import { ProtectedRoute } from './protectedRoute'
import { Layout } from './components/Layout'

import './App.css'

function App() {

  useEffect(()=>{
    let token=sessionStorage.getItem("User");
    if(token){
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    }
  },[])


  return (
    <>
    <Router>
      <Routes>
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/home"element={ <ProtectedRoute> <Home/> </ProtectedRoute>}/>
        </Route>
        <Route path="/" element={<Login/>}/> 
      </Routes>

      
    </Router>
    </>
  )
}

export default App
