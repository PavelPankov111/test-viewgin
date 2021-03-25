import './ProtectedRoute.css'
import React from 'react';
import { Route, Redirect } from 'react-router-dom'

// Это у нас HOC component, если пользователь авторизовался - мы перенаправляем его на главную страницу, а если нет - редиректим на страницу входауы
export function ProtectedRoute({ children, ...props }) {
    if (props.loggedIn) {
        return <Route {...props}>{children}</Route>
    } else {
        return <Redirect to='/signin' />
    }
}