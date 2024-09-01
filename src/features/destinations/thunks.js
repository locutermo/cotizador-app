import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  fetchDestinations,
  createDestination,
  deleteDestination,
  updateDestination
} from '../../services/destinations'


export const getDestinations = createAsyncThunk(
  'destinations/fetchDestinations',
  async (thunkAPI) => {
    try {
      const res = await fetchDestinations()
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  },
)

export const addDestination = createAsyncThunk(
  'destinations/addDestination',
  async (data,thunkAPI) => {
    try {
      const res = await createDestination(data)
      return res.data[0]
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)


export const removeDestination = createAsyncThunk(
  'destinations/removeDestination',
  async (id,thunkAPI) => {
    try {
      await deleteDestination(id)
      return id
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)

export const editDestination = createAsyncThunk(
  'destinations/editDestination',
  async ({id,...destination},thunkAPI) => {
    try {
      const res = await updateDestination(id,destination)
      return res.data[0]
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)

