import App from './App';
import ErrorPage from "./ErrorPage";
import HomePage from "./HomePage";

const routes = [
    {
        path: "/",
        element: <HomePage />,
        ErrorElement: <ErrorPage />,
    },
    {
        path: '/dvd',
        element: <App prop={'DVD'} />,
        ErrorElement: <ErrorPage />,
    },
    {
        path: '/store',
        element: <App prop={'store'} />,
        ErrorElement: <ErrorPage />,
    },
    {
        path: '/staff',
        element: <App prop={'staff'} />,
        ErrorElement: <ErrorPage />,
    },
    {
        path: '/rental',
        element: <App prop={'rental'} />,
        ErrorElement: <ErrorPage />,
    },
    {
        path: '/payment',
        element: <App prop={'payment'} />,
        ErrorElement: <ErrorPage />,
    },
    {
        path: '/language',
        element: <App prop={'language'} />,
        ErrorElement: <ErrorPage />,
    },
    {
        path: '/inventory',
        element: <App prop={'inventory'} />,
        ErrorElement: <ErrorPage />,
    },
    {
        path: '/film',
        element: <App prop={'film'} />,
        ErrorElement: <ErrorPage />,
    },
    {
        path: '/film_category',
        element: <App prop={'film_category'} />,
        ErrorElement: <ErrorPage />,
    },
    {
        path: '/film_actor',
        element: <App prop={'film_actor'} />,
        ErrorElement: <ErrorPage />,
    },
    {
        path: '/customer',
        element: <App prop={'customer'} />,
        ErrorElement: <ErrorPage />,
    },
    {
        path: '/country',
        element: <App prop={'country'} />,
        ErrorElement: <ErrorPage />,
    },
    {
        path: '/city',
        element: <App prop={'city'} />,
        ErrorElement: <ErrorPage />,
    },
    {
        path: '/category',
        element: <App prop={'category'} />,
        ErrorElement: <ErrorPage />,
    },
    {
        path: '/address',
        element: <App prop={'address'} />,
        ErrorElement: <ErrorPage />,
    },
    {
        path: '/actor',
        element: <App prop={'actor'} />,
        ErrorElement: <ErrorPage />,
    }
];

export default routes;