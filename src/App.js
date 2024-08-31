import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { routes } from './routes/routes';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getClients } from './features/clients/thunks'

const router = createBrowserRouter(routes)

function App() {

  const dispatch = useDispatch()
  const {status} = useSelector((state) => state.client)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getClients())
    }
  }, [])

  return (
    <RouterProvider
      router={router}
    />
  );
}

export default App;
