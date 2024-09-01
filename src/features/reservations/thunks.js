import { createAsyncThunk } from '@reduxjs/toolkit'

import { 
    fetchReservations
} from '../../services/reservations'


export const getReservations = createAsyncThunk(
    'clients/fetchReservations',
    async (thunkAPI) => {
      try {
        const res = await fetchReservations()
        console.log({res})
        return res.data
      } catch (err) {
        return thunkAPI.rejectWithValue({ error: err.message })
      }
    },
)


  