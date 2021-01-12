import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../context/auth';

export default function AuthRoute({ component: Component, ...rest }) {
    const { user } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={(props => user ? <Redirect to='/' /> : <component {...props} />)}
        />
    );
}
