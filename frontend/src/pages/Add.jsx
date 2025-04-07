import { useState } from "react"
import { createTask } from "../api";


export function Add() {

    const[taskName,setTaskName]=useState("");

    async function handleSubmit(e){
        e.preventDefault();
        console.log("Form submitted");

        let newTask={
            name:taskName,
        }

        await createTask(newTask);
        setTaskName("");


    }

    return(
        //update task name as user types in textbox
        <form onSubmit={handleSubmit}>
            <label>What's the task?</label>
            <input value={taskName} onChange={(e)=>setTaskName(e.target.value)} required name="taskName"/>
            <button type="submit">Enter</button>
        </form>
       
    )

}