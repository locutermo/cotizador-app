import { createSlice } from '@reduxjs/toolkit'
import { getClients, addClient, removeClient, editClient } from './thunks'
import { formatClients } from '../../util/util'


const initialState = {
  clients: [],
  error: null,
  status: 'idle',
}

export const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {

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

    builder.addCase(addClient.fulfilled, (state, action) => {
      state.clients.push(action.payload)
    })

    builder.addCase(removeClient.fulfilled, (state, action) => {
      state.clients = state.clients.filter(e => e.id !== action.payload)
    })

    builder.addCase(editClient.fulfilled, (state, action) => {
      const payload = action.payload
      console.log("Payload: ", payload)
      state.clients = state.clients.map(e => e.id === payload.id ? payload : e)
    })


  }
})

export const clientsFormattedSelector = (state) => formatClients(state.client.clients)


// export const {

// } = clientSlice.actions


export default clientSlice.reducer