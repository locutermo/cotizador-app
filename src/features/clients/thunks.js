import { createAsyncThunk } from '@reduxjs/toolkit'

import { 
    fetchClients, 
    fetchClientsReservations 
} from '../../services'


export const getClients = createAsyncThunk(
    'clients/fetchClients',
    async (thunkAPI) => {
      try {
        const res = await fetchClients()
        return res.data
      } catch (err) {
        return thunkAPI.rejectWithValue({ error: err.message })
      }
    },
)

export const getClientsReservations = createAsyncThunk(
    'clients/fetchClientsReservations',
    async (thunkAPI) => {
      try {
        const res = await fetchClientsReservations()
        return res.data
      } catch (err) {
        return thunkAPI.rejectWithValue({ error: err.message })
      }
    },
  )
  