import { createSlice } from '@reduxjs/toolkit'
import { getReservations } from './thunks'
import { formatReservations } from '../../util/util'


const initialState = {
  reservations: [],
  error: null,
  status: 'idle',
}

export const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    addReservation: (state, action) => {
      state.reservations.push(action.payload)
    },
  },
  extraReducers: (builder) => {

    builder.addCase(getReservations.pending, (state, action) => {
      state.status = 'loading'
    })

    builder.addCase(getReservations.fulfilled, (state, action) => {
      state.reservations = formatReservations(action.payload)
      state.status = 'successful'
    })

    builder.addCase(getReservations.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error
    })

  }
})



export const {
  addReservation,
} = reservationSlice.actions


export default reservationSlice.reducer