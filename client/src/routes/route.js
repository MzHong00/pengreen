import { createBrowserRouter } from "react-router-dom";
import Home from "../domain/home";
import Signup from "../domain/signup";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                
            },
        ]
    },
    {
        path: "/auth/google",
        element: <Signup />
    }
])

export default router