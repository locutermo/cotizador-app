import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'
import { getDestinations, addDestination, removeDestination, editDestination } from './thunks'
import { formatDestinations } from '../../util/util'


const initialState = {
  destinations: [],
  error: null,
  status: 'idle',
}

export const destinationSlice = createSlice({
  name: 'destinations',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {

    builder.addCase(getDestinations.pending, (state, action) => {
      state.status = 'loading'
    })

    builder.addCase(getDestinations.fulfilled, (state, action) => {
      state.destinations = action.payload
      state.status = 'successful'
    })

    builder.addCase(getDestinations.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error
    })

    builder.addCase(addDestination.fulfilled, (state, action) => {
      state.destinations.push(action.payload)
    })

    builder.addCase(removeDestination.fulfilled, (state, action) => {
      state.destinations = state.destinations.filter(e => e.id !== action.payload)
    })

    builder.addCase(editDestination.fulfilled, (state, action) => {
      const payload = action.payload
      console.log("Payload: ", payload)
      state.destinations = state.destinations.map(e => e.id === payload.id ? payload : e)
    })


  }
})

export const destinationsFormattedSelector = (state) => state.destination.destinations

export const destinationOptionsSelector = createDraftSafeSelector(
  destinationsFormattedSelector,
  (state) => state.map(element => ({label:element.name,value:element.id})),
)

export default destinationSlice.reducer