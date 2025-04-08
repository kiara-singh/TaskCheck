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
        setEdit(true);
        setNewTask(task);
    };

    const handleAddSubmit = async (newTask) => {
        await createTask(newTask);
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const handleEditSubmit = async (updatedTask) => {
        await updateTask(updatedTask._id, updatedTask);
        setTasks((prevTasks) =>prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
        setEdit(false);
        setNewTask(null);
    };

    async function handleDelete(id) {
        await deleteTask(id);
        setTasks(tasks.filter((task) => task._id !== id));
    }

    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-1/3 mt-4">
                {tasks.map((task) => (
                    <div key={task._id} className="p-2 border rounded mb-2 flex items-center justify-between">
                        {edit && newTask._id === task._id ? (
                            // For editing task
                            <TaskForm
                                onSubmit={handleEditSubmit} 
                                initialData={newTask} 
                                buttonText="Save"
                            />
                        ) : (
                            <div className="flex items-center">
                                <p className="mr-4">{task.name}</p>
                                <button
                                    onClick={() => handleStartEdit(task)}
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
                        )}
                    </div>
                ))}

                {!edit && (
                    <TaskForm
                        onSubmit={handleAddSubmit} 
                        initialData={{}} 
                        buttonText="Add Task"
                    />
                )}
            </div>
        </div>
    );
}
