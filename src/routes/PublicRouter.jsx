import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PublicRouter = ({children}) => {
    const {user} = useContext(AuthContext)

    if (!user) {
		return children; // this children is the page component on the Router.jsx
	}
    
    return <Navigate to="/"></Navigate>

};

export default PublicRouter;