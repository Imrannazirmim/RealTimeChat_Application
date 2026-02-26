import React from "react";
import {useAuthStore} from "../store/useAuthStore";
import {Navigate, useLocation} from "react-router";
import {Loader} from "lucide-react";

const PrivateRoute = ({children}) => {
    const location = useLocation();
    const {authUser, checkAuth} = useAuthStore();

    if (!checkAuth && !authUser) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    if (!checkAuth && !authUser) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <Loader className='size-10 animate-spin'/>
            </div>
        )
    }
    return children;
};

export default PrivateRoute;
