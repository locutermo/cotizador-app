import {
  createBrowserRouter,
  RouterProvider,
  createHashRouter
} from "react-router-dom";
import { routes } from './routes/routes';
import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { getClients } from './features/clients/thunks'
import { getReservations } from './features/reservations/thunks'
import { getDestinations } from "./features/destinations/thunks";
import { getHotels } from "./features/hotels/thunks";
import { getAerolines } from "./features/aerolines/thunks";
import { getTours } from "./features/tours/thunks";
import "react-toastify/dist/ReactToastify.css";

const router = createHashRouter(routes)

function App() {

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getTours())
    dispatch(getDestinations())
    dispatch(getHotels())
    dispatch(getAerolines())
    dispatch(getClients())
    dispatch(getReservations())


  })

  return (
    <RouterProvider
      router={router}
    />
  );
}

export default App;
