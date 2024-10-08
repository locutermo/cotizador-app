import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'
import { getHotels, addHotel, removeHotel, editHotel } from './thunks'
import { formatHotels } from '../../util/util'
import { COLUMN_NAMES } from '../../util/constants'


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
  (state) => state.map(element => ({label:`${element.name}`,value:element.id})),
)

export const hotelToAssign = createDraftSafeSelector(
  hotelsFormattedSelector,
  (state) => state.map(element => ({name:element.name,id:element.id,column:COLUMN_NAMES.VALUES_TO_ASSIGN})),
)


export default hotelSlice.reducer