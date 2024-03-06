import { Outlet } from "react-router-dom";

export default function Main() {

    return (
        <main className="flex gap-5">
            <Outlet />
        </main>
    )
}