import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { authUser } = useAuthStore();

    if (!authUser) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
