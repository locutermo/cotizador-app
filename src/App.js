import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { routes } from './routes/routes';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getClients } from './features/clients/thunks'
import { getReservations } from './features/reservations/thunks'

const router = createBrowserRouter(routes)

function App() {

  const dispatch = useDispatch()


  useEffect(() => {

    dispatch(getClients())
    dispatch(getReservations())

  }, [])

  return (
    <RouterProvider
      router={router}
    />
  );
}

export default App;
