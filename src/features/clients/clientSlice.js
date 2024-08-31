import { createSlice } from '@reduxjs/toolkit'
import { getClients,getClientsReservations } from './thunks'


const initialState = {
  clients: [],
  error: null,
  status: 'idle',
}

export const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    addClient: (state, action) => {
        state.clients.push(action.payload)
    },
  },
  extraReducers: (builder) => {

    builder.addCase(getClients.pending, (state, action) => {
      state.status = 'loading'
    })

    builder.addCase(getClients.fulfilled, (state, action) => {
      state.clients = action.payload
      state.status = 'successful'
    })

    builder.addCase(getClients.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error
    })

  }
})

export const {
  addClient,
} = clientSlice.actions


export default clientSlice.reducer