import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  fetchHotels,
  createHotel,
  deleteHotel,
  updateHotel
} from '../../services/hotels'


export const getHotels = createAsyncThunk(
  'hotels/fetchHotels',
  async (thunkAPI) => {
    try {
      const res = await fetchHotels()
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  },
)

export const addHotel = createAsyncThunk(
  'hotels/addHotel',
  async (data,thunkAPI) => {
    try {
      const res = await createHotel(data)
      console.log('hotels/addHotel', {res,data})
      return res.data[0]
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)


export const removeHotel = createAsyncThunk(
  'hotels/removeHotel',
  async (id,thunkAPI) => {
    try {
      await deleteHotel(id)
      return id
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)

export const editHotel = createAsyncThunk(
  'hotels/editHotel',
  async ({id,...hotel},thunkAPI) => {
    try {
      const res = await updateHotel(id,hotel)
      return res.data[0]
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)

