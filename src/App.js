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

const router = createHashRouter(routes)

function App() {

  const dispatch = useDispatch()


  useEffect(() => {

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
