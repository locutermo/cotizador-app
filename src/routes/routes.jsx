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
            {
                path: 'cotizations',
                element: <Cotization/>
            }
        ]
    }
]