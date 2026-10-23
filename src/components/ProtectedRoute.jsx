import { Navigate } from "react-router";
import { getToken } from "../api/auth";

function ProtectedRoute({children}) {
    if (!getToken()) {
        return  <Navigate to="/login" />;

    }
    return children;

}

