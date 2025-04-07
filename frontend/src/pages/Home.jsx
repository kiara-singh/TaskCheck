import { getTasks } from "../api"
import { useState, useEffect } from "react"

export function Home() {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        async function loadAllTasks() {
            const data = await getTasks()
            setTasks(data)
        }
        loadAllTasks()
    }, [])

    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-1/3 mt-4">
            {tasks.map((task) => {
                return (
                    task
                )
            })}
            </div>
        </div>
    )
}