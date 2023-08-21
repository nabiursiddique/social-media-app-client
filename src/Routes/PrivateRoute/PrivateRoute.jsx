import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import LoadingAnimation from '../../components/LittleComponents/LoadingAnimation/LoadingAnimation';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <LoadingAnimation></LoadingAnimation>;
    }

    if (user) {
        return children;
    }

    return <Navigate to='/signIn' state={{ from: location }} replace />
};

export default PrivateRoute;