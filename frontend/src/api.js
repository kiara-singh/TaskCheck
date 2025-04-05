
import axios from "axios";

const URL="http://localhost:3000";

export async function getTasks(){
    const response=await axios.get(`${URL}/tasks`);
    if (response.status===200){
        return response.data;
    }else{
        return;
    }
}

export async function getTask(id){
    const response=await axios.get(`${URL}/tasks/${id}`);
    if (response.status===200){
        return response.data;
    }else{
        return;
    } 
}

export async function createTask(task){
    const response=await axios.post(`${URL}/tasks`,task);
    return response;
}

export async function updateTask(id,task){
    const response=await axios.put(`${URL}/tasks/${id}`,task);
    return response;
}

export async function deleteTask(id){
    const response=await axios.delete(`${URL}/tasks/${id}`);
    return response;
}