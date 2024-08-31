import { configureStore } from '@reduxjs/toolkit'
import cotizationReducer from './features/cotization/cotizationSlice'
import clientReducer from './features/clients/clientSlice'

export const store = configureStore({
  reducer: {
    cotization: cotizationReducer,
    client: clientReducer
  },
})