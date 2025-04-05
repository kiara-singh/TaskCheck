import { useState, useEffect } from 'react'
import {getTasks, getTask, createTask, updateTask, deleteTask} from './api'
import './App.css'

function App() {

  const[tasks,setTasks]=useState();

  function makeTask(){
    let tasksObject={
      name:"Swim",
      user:"Test"
    }

    createTask(tasksObject)
  }

  //runs on first render
  useEffect(()=>{
    async function loadAllTasks(){
      let data=await getTasks();
      if (data){
        setTasks(data);
      }
    }

    loadAllTasks()
  }, [])

  return (
    <>
      <button onClick={makeTask}>
        Create
      </button>
    </>
  )
}

export default App
