import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'
import { getClients, addClient, removeClient } from './thunks'
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
      state.clients = state.clients.filter( e => e.id !== action.payload)
    })

  }
})


// al crear el selector tenemos acceso a todos los selectores que estan en el combine
export const clientsFormattedSelector = (state) => formatClients(state.client.clients)

// export const clientWithReservationsSelector = createDraftSafeSelector(
//   selectSelf,
//   (state) => state.value,
// )



export const {
  
} = clientSlice.actions


export default clientSlice.reducer