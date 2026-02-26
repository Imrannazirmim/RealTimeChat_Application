import { createBrowserRouter } from "react-router";
import RootLayout from "../Components/Layout/RootLayout";
import Home from "../Pages/Home";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";
import Setting from "../Pages/Setting";
import Profile from "../Pages/Profile";
import PrivateRoute from "./PrivateRoute.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        children: [
            { index: true, element: <Home /> },
            { path: "/signup", element: <SignUp /> },
            { path: "/login", element: <Login /> },
            {
                path: "/setting",
                element: (
                    <PrivateRoute>
                        <Setting />
                    </PrivateRoute>
                ),
            },
            {
                path: "/profile",
                element: (
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                ),
            },
        ],
    },
]);









