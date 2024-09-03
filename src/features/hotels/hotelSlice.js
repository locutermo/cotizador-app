import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'
import { getHotels, addHotel, removeHotel, editHotel } from './thunks'
import { formatHotels } from '../../util/util'


const initialState = {
  hotels: [],
  error: null,
  status: 'idle',
}

export const hotelSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {

    builder.addCase(getHotels.pending, (state, action) => {
      state.status = 'loading'
    })

    builder.addCase(getHotels.fulfilled, (state, action) => {
      console.log({hotels:action.payload})
      state.hotels = action.payload
      state.status = 'successful'
    })

    builder.addCase(getHotels.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error
    })

    builder.addCase(addHotel.fulfilled, (state, action) => {
      state.hotels.push(action.payload)
    })

    builder.addCase(removeHotel.fulfilled, (state, action) => {
      state.hotels = state.hotels.filter(e => e.id !== action.payload)
    })

    builder.addCase(editHotel.fulfilled, (state, action) => {
      const payload = action.payload
      state.hotels = state.hotels.map(e => e.id === payload.id ? payload : e)
    })


  }
})

export const hotelsFormattedSelector = (state) => formatHotels(state.hotel.hotels)

export const hotelOptionsSelector = createDraftSafeSelector(
  hotelsFormattedSelector,
  (state) => state.map(element => ({label:`${element.name} - ${element.stars}*`,value:element.id})),
)

export default hotelSlice.reducer