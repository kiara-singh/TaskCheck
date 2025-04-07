
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


export async function getUser(id){
    const response=await axios.get(`${URL}/users/${id}`);
    if (response.status===200){
        return response.data;
    }else{
        return;
    } 
}

export async function createUser(user){
    const response=await axios.post(`${URL}/users/register`,user);
    return response;
}

export async function updateUser(id,user){
    const response=await axios.put(`${URL}/users/${id}`,user);
    return response;
}



export async function verifyUser(user) {
    try {
        const response = await axios.post("http://localhost:3000/users/verify", user);
        if (response.data.success) {
            return response.data.token;
        } else {
           return;
        }
    } catch (error) {
        console.error('Error verifying user:', error);
        throw error;
    }
}

