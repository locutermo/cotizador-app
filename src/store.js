import { configureStore } from '@reduxjs/toolkit'
import cotizationReducer from './features/cotization/cotizationSlice'
import clientReducer from './features/clients/clientSlice'
import destinationReducer from './features/destinations/destinationSlice'
import reservationReducer from './features/reservations/reservationSlice'
import aerolineReducer from './features/aerolines/aerolineSlice'
import hotelReducer from './features/hotels/hotelSlice'
export const store = configureStore({
  reducer: {
    cotization: cotizationReducer,
    client: clientReducer,
    hotel:hotelReducer,
    aeroline:aerolineReducer,
    reservation:reservationReducer,
    destination:destinationReducer
  },
})