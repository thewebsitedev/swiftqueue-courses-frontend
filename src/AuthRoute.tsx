import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { AuthRouteProps } from './Types';
import Spinner from './components/Spinner';
import Header from './components/Header';
import { Fragment } from 'react';

/**
 * Protected route for authenticated users
 *
 * @param children
 * @returns {JSX.Element}
 */
const AuthRoute = ({ children }: AuthRouteProps) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <><Header /><Spinner /></>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default AuthRoute;
