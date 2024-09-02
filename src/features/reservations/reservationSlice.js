import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'
import { getReservations, createReservationWithAerolinesAndHotels } from './thunks'
import { formatReservations, formatReservationWithDestinations } from '../../util/util'


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

    builder.addCase(createReservationWithAerolinesAndHotels.fulfilled, (state, action) => {
      const reservationFormatted = formatReservationWithDestinations(action.payload)
      state.reservations = [...state.reservations, reservationFormatted]
      console.log(reservationFormatted)
    })

    builder.addCase(createReservationWithAerolinesAndHotels.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error
    })

  }
})

export const reservationsSelector = (state) => state.reservation.reservations
export const reservationsOrdered = createDraftSafeSelector(
  reservationsSelector,
  (state) => {
    const copy = [...state]
    const sorted = copy.sort((a, b) => a.created_at - b.created_at)
    return sorted.reverse()
  },
)

export const reservationFoundSelector = (id) => createDraftSafeSelector(
  reservationsSelector,
  (state) => state.find(e => e.id === id),
)



export const {
  addReservation,
} = reservationSlice.actions


export default reservationSlice.reducer