import { deleteTask, getTasks, updateTask, createTask } from "../api";
import { useState, useEffect } from "react";
import * as jwt_decode from 'jwt-decode';
import TaskForm from "../components/TaskForm";

export function Home() {
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState(null);
    const [edit, setEdit] = useState(false);
    const [newTask, setNewTask] = useState(null);

    useEffect(() => {
        async function loadAllTasks() {
            const data = await getTasks();
            const token = sessionStorage.getItem("User");
            const decodeUser = jwt_decode.jwtDecode(token);
            const personalTasks = data.filter((task) => task.user === decodeUser._id);
            setTasks(personalTasks);
            setUser(decodeUser);
        }
        loadAllTasks();
    }, []);

    const handleStartEdit = (task) => {
        console.log("Task being edited:", task);
        setNewTask(task);
        setEdit(true);
    };

    const handleAddSubmit = async (newTask) => {
        await createTask(newTask);
        setTasks((prevTasks) => [...prevTasks, newTask]);
        
    };

    const handleEditSubmit = async (updatedTask) => {
        if (!updatedTask._id) {
            console.error("Task ID is missing");
            console.log("task is ", updatedTask)
            return;
        }
        await updateTask(updatedTask._id, updatedTask);
        setTasks((prevTasks) => prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
        setEdit(false);
        setNewTask(null);
    };

    async function handleDelete(id) {
        if (!id) {
            console.error("Task ID is missing");
            return;
        }
        await deleteTask(id);
        setTasks(tasks.filter((task) => task._id !== id));
    }

    return (
        <div className="flex flex-col items-center w-full py-6">
            <div className="w-full max-w-lg mt-4">
                {tasks.map((task) => (
                    <div key={task._id} className="p-4 border rounded-lg mb-4 shadow-lg hover:shadow-xl transition-all flex items-center justify-between bg-white">
                        {edit && newTask._id === task._id ? (
                            // For editing task
                            <TaskForm
                                onSubmit={handleEditSubmit}
                                initialData={newTask}
                                buttonText="Save"
                            />
                        ) : (
                            <div className="flex items-center space-x-4">
                                <p className="text-lg font-semibold text-gray-800">{task.name}</p>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => handleStartEdit(task)}
                                        className="bg-yellow-400 p-2 rounded-lg text-white hover:bg-yellow-500 transition duration-300"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(task._id)}
                                        className="bg-red-600 p-2 rounded-lg text-white hover:bg-red-700 transition duration-300"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
    
                {!edit && (
                    <TaskForm
                        onSubmit={handleAddSubmit}
                        initialData={{}}
                        buttonText="Add Task"
                        className="pt-200"
                    />
                )}
            </div>
        </div>
    );
    
}
