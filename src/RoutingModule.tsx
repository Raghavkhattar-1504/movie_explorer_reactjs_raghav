import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginSignup from './components/LoginSignup';
import AllMovies from './components/AllMovies';


const RoutingModule = () => {
    const route = createBrowserRouter([
        {
            path: '/',
            element: <LoginSignup />
        },
        {
            path: '/home',
            element: <HomePage />
        },
        {
            path: '/allmovies',
            element: <AllMovies />
        },

    ]);

    return (
        <RouterProvider router={route} />
    )
}

export default RoutingModule;