import { Navbar } from "./Navbar"
import { Outlet, useNavigate } from "react-router-dom"

export function Layout() {

    return (
        <>
            <Navbar/>
            <main className="flex first-letter:w-screen justify-center mt-24">
                <Outlet/>
            </main>
        </>
    )
}