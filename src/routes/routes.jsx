import DefaultLayout from "../layout/DefaultLayout";
import Home from '../pages/Home';
import Cotization from '../pages/Cotizacion';
import ErrorPage from "../pages/ErrorPage";
import Reservation from "../pages/Reservation";
import Clients from "../pages/Clients";
import ClientCotizations from "../pages/ClientCotizations";
import Destination from "../pages/Destination";
import Aerolines from "../pages/Aeroline";
import Hotels from "../pages/Hotel";
import CotizationDetail from "../components/commons/CotizationDetail";
import ReservationDetail from "../pages/ReservationDetail";

export const routes = [
    {
        path: '/',
        element: <DefaultLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: 'cotizations', element: <Cotization />},
            { path: 'reservations', element: <Reservation/>},
            { path: 'reservations/:id/detail', element: <ReservationDetail/>},
            { path: 'destinations', element: <Destination/>},
            { path: 'hotels', element: <Hotels/>},
            { path: 'aerolines', element: <Aerolines/>},
            { path: 'customers', element: <Clients/>},
            { path: 'customers/:id/reservations', element: <ClientCotizations/>},
            { path: 'profile', element: <h1>PERFIL</h1> },
            { path: 'settings', element: <h1>AJUSTES</h1> },
        ]
    }
]