import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from './UserContext';

function ProtectRouter({ children }) {
    const { user, isLoading } = useUser();  // Access isLoading from context
    const location = useLocation();

    if (isLoading) {
        // Optional: Show a loading indicator or simply hold off rendering until loading is complete
        return <div>Loading...</div>;
    }

    if (!user) {
        // Redirect to /login only if not loading and user is null
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default ProtectRouter;
