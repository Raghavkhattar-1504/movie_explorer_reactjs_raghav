import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GenrePage from './pages/GenrePage';
import SearchPage from './pages/SearchPage';
import AddMovieForm from './pages/AddMoviePage';
import { StripeWrapper } from './components/StripeWrapper';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import AuthPage from './pages/AuthPage';
import SubscriptionPage from './pages/SubscriptionPage';
import MovieDetailPage from './pages/MovieDetailPage';
import AllMoviesPage from './pages/AllMoviesPage';
import NotFoundPage from './pages/NotFoundPage';
import WatchlistPage from './pages/WatchlistPage';


const RoutingModule = () => {
    const route = createBrowserRouter([
        {
            path: '/login',
            element: <AuthPage />
        },
        {
            path: '/',
            element: <HomePage />
        },
        {
            path: '/allmovies',
            element: <AllMoviesPage />
        },
        {
            path: '/genre/:genre',
            element: <GenrePage />
        },
        {
            path: `/home/detail/:id`,
            element: <MovieDetailPage />
        },
        {
            path: '/subscription',
            element: (
                <StripeWrapper>
                    <SubscriptionPage />
                </StripeWrapper>
            )
        },
        {
            path: '/search',
            element: <SearchPage />
        },
        {
            path: '/addMovie',
            element: <AddMovieForm />
        },
        {
            path: '/editMovie/:id',
            element: <AddMovieForm />
        },
        {
            path: '/payment/success',
            element: <PaymentSuccessPage />
        },
        {
            path: '/watchlist',
            element: <WatchlistPage />
        },
        {
            path: '/*',
            element: <NotFoundPage />
        },
    ]);

    return (
        <RouterProvider router={route} />
    )
}

export default RoutingModule;