import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/home/Home";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import ErrorPage from "@/components/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";


const router = createBrowserRouter([
    {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
        {
            path: "/",
            element: <ProtectedRoute><Home/></ProtectedRoute>
        },
        {
            path: "/login",
            element: <Login/>
        },
        {
            path: "/register",
            element: <Register/>
        }
    ]
}])

export default router;