import { createBrowserRouter } from "react-router";
import RootLayout from "../Components/Layout/RootLayout";
import Home from "../Pages/Home";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";
import Setting from "../Pages/Setting";
import Profile from "../Pages/Profile";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            { index: true, Component: Home },
            { path: "/signup", Component: SignUp },
            { path: "/login", Component: Login },
            { path: "/setting", Component: Setting },
            { path: "/profile", Component: Profile },
        ],
    },
]);
