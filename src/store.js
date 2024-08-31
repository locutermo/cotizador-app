import { configureStore } from '@reduxjs/toolkit'
import cotizationReducer from './features/cotization/cotizationSlice'

export const store = configureStore({
  reducer: {
    cotization: cotizationReducer,
  },
})