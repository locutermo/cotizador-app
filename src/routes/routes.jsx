import DefaultLayout from "../layout/DefaultLayout";
import Home from '../pages/Home';
import Cotization from '../pages/Cotizacion';
import ErrorPage from "../pages/ErrorPage";

export const routes = [
    {
        path:'/',
        element: <DefaultLayout/>,
        errorElement: <ErrorPage/>,
        children:[
            {path: 'cotizations',element: <Cotization/>},
            {path: 'reservations',element: <h1>RESERVACIONES</h1>},
            {path: 'customers',element: <h1>CLIENTES</h1>},
            {path: 'profile',element: <h1>PERFIL</h1>},
            {path: 'settings',element: <h1>AJUSTES</h1>},
        ]
    }
]