import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'
import { getDestinations, addDestination, removeDestination, editDestination, assignHotelToDestination, assignAerolineToDestination, removeHotelFromDestination, removeAerolineFromDestination } from './thunks'
import { formatPlaceAerolineToObject, formatPlaceHotelToObject, formatPlaceWithAerolineAndHotelToObject } from '../../util/util'


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
      state.destinations = action.payload.map(e => formatPlaceWithAerolineAndHotelToObject(e))
      state.status = 'successful'
    })

    builder.addCase(getDestinations.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error
    })

    builder.addCase(addDestination.fulfilled, (state, action) => {
      state.destinations.push(formatPlaceWithAerolineAndHotelToObject(action.payload))
    })

    builder.addCase(removeDestination.fulfilled, (state, action) => {
      state.destinations = state.destinations.filter(e => e.id !== action.payload)
    })

    builder.addCase(editDestination.fulfilled, (state, action) => {
      const payload = action.payload
      state.destinations = state.destinations.map(e => e.id === payload.id ? formatPlaceWithAerolineAndHotelToObject(payload) : e)
    })

    builder.addCase(assignHotelToDestination.fulfilled, (state, action) => {

      const { id, items } = action.payload
      const hotelsFormatted = items.map(e => formatPlaceHotelToObject(e))
      state.destinations = state.destinations.map(destination => {
        if (destination.id === id) {
          return {
            ...destination,
            hotels: [...destination.hotels, ...hotelsFormatted]
          }
        }

        return destination
      })
    })
    builder.addCase(assignAerolineToDestination.fulfilled, (state, action) => {

      const { id, items } = action.payload
      const aerolinesFormatted = items.map(e => formatPlaceAerolineToObject(e))
      console.log({aerolinesFormatted})
      state.destinations = state.destinations.map(destination => {
        if (destination.id === id) {
          return {
            ...destination,
            aerolines: [...destination.aerolines, ...aerolinesFormatted]
          }
        }

        return destination
      })
    })
    builder.addCase(removeHotelFromDestination.fulfilled, (state, action) => {
      const { destinationId, id } = action.payload
      state.destinations = state.destinations.map(destination => {
        if (destination.id === destinationId) {
          return {
            ...destination,
            hotels: destination.hotels.filter(e => e.id !== id)
          }
        }

        return destination
      })

    })
    builder.addCase(removeAerolineFromDestination.fulfilled, (state, action) => {
      const { destinationId, id } = action.payload
      state.destinations = state.destinations.map(destination => {
        if (destination.id === destinationId) {
          return {
            ...destination,
            aerolines: destination.aerolines.filter(e => e.id !== id)
          }
        }
        return destination
      })


    })
  }
})

export const destinationsFormattedSelector = (state) => state.destination.destinations

export const destinationOptionsSelector = createDraftSafeSelector(
  destinationsFormattedSelector,
  (state) => state.map(element => ({ label: element.name, value: element.id })),
)

export default destinationSlice.reducer