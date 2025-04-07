import { deleteTask, getTasks } from "../api"
import { useState, useEffect } from "react"
import * as jwt_decode from 'jwt-decode'

export function Home() {

    const [tasks, setTasks] = useState([])
    const[user,setUser]=useState(null)

    useEffect(() => {
        async function loadAllTasks() {
            const data = await getTasks();
            const token=sessionStorage.getItem("User");
            const decodeUser =jwt_decode.jwtDecode(token);
            const personalTasks=data.filter((task)=>task.user==decodeUser._id);
            setTasks(personalTasks);
            setUser(decodeUser);
        }
        loadAllTasks()
    }, [])

    async function handleDelete(id){
        await deleteTask(id);
        setTasks(tasks.filter((task)=>task._id!==id));
    }

    return (
        <div className="flex flex-row items-center w-full">
            <div className="w-1/3 mt-4">
            {tasks.map((task) => (
                <div key={task._id} className="p-2 border rounded mb-2 flex items-center justify-between">
                 <p className="mr-4">{task.name}</p>
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleEdit(task._id)}
                        className="bg-yellow-300 p-2 rounded"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(task._id)}
                        className="bg-red-500 p-2 rounded text-white"
                    >
                        Delete
                    </button>
                </div>
                </div>
            ))}

            </div>
        </div>
    )
}