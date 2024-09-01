import { configureStore } from '@reduxjs/toolkit'
import cotizationReducer from './features/cotization/cotizationSlice'
import clientReducer from './features/clients/clientSlice'
import destinationReducer from './features/destinations/destinationSlice'
import reservationReducer from './features/reservations/reservationSlice'
export const store = configureStore({
  reducer: {
    cotization: cotizationReducer,
    client: clientReducer,
    reservation:reservationReducer,
    destination:destinationReducer
  },
})