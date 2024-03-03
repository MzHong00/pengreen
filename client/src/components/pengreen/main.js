import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";

export default function Main() {

    return (
        <main className="flex gap-5">
            <Outlet />
        </main>
    )
}