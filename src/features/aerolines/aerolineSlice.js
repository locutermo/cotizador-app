import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'
import { getAerolines, addAeroline, removeAeroline, editAeroline } from './thunks'


const initialState = {
  aerolines: [],
  error: null,
  status: 'idle',
}

export const aerolineSlice = createSlice({
  name: 'aerolines',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {

    builder.addCase(getAerolines.pending, (state, action) => {
      state.status = 'loading'
    })

    builder.addCase(getAerolines.fulfilled, (state, action) => {
      state.aerolines = action.payload
      state.status = 'successful'
    })

    builder.addCase(getAerolines.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error
    })

    builder.addCase(addAeroline.fulfilled, (state, action) => {
      state.aerolines.push(action.payload)
    })

    builder.addCase(removeAeroline.fulfilled, (state, action) => {
      state.aerolines = state.aerolines.filter(e => e.id !== action.payload)
    })

    builder.addCase(editAeroline.fulfilled, (state, action) => {
      const payload = action.payload
      state.aerolines = state.aerolines.map(e => e.id === payload.id ? payload : e)
    })


  }
})

export const aerolinesFormattedSelector = (state) => state.aeroline.aerolines

export const aerolineOptionsSelector = createDraftSafeSelector(
  aerolinesFormattedSelector,
  (state) => state.map(element => ({label:element.name,value:element.id})),
)

export default aerolineSlice.reducer