import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'
import { getTours, addTour, removeTour, editTour } from './thunks'
import { formatTourToObject } from '../../util/util'


const initialState = {
  tours: [],
  error: null,
  status: 'idle',
}

export const tourSlice = createSlice({
  name: 'tours',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {

    builder.addCase(getTours.pending, (state, action) => {
      state.status = 'loading'
    })

    builder.addCase(getTours.fulfilled, (state, action) => {
      state.tours = action.payload.map(e => formatTourToObject(e))
      state.status = 'successful'
    })

    builder.addCase(getTours.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error
    })

    builder.addCase(addTour.fulfilled, (state, action) => {
      state.tours.push(formatTourToObject(action.payload))
    })

    builder.addCase(removeTour.fulfilled, (state, action) => {
      state.tours = state.tours.filter(e => e.id !== action.payload)
    })

    builder.addCase(editTour.fulfilled, (state, action) => {
      const payload = action.payload
      state.tours = state.tours.map(e => e.id === payload.id ? formatTourToObject(payload) : e)
    })


  }
})

export const toursFormattedSelector = (state) => state.tour.tours

export const tourOptionsSelector = createDraftSafeSelector(
  toursFormattedSelector,
  (state) => state.map(element => ({label:element.name,value:element.id})),
)



export default tourSlice.reducer