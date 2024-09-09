import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  fetchDestinations,
  createDestination,
  deleteDestination,
  updateDestination,
  removeAerolineDestination,
  removeHotelDestination,
  assignAerolinesDestination,
  assignHotelsDestination
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
  async (data, thunkAPI) => {
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
  async (id, thunkAPI) => {
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
  async ({ id, ...destination }, thunkAPI) => {
    try {
      const res = await updateDestination(id, destination)
      return res.data[0]
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)

export const assignHotelToDestination = createAsyncThunk(
  'destinations/assignHotelToDestination',
  async ({id,items}, thunkAPI) => {
    try {
      const res = await assignHotelsDestination(items)
      console.log({ res }, "destinations/assignHotelToDestination")
      return {id,items:res.data}
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)

export const assignAerolineToDestination = createAsyncThunk(
  'destinations/assignAerolineToDestination',
  async ({id,items}, thunkAPI) => {
    try {
      const res = await assignAerolinesDestination(items)
      console.log({ res }, "destinations/assignAerolineToDestination")
      return {
        id,
        items:res.data
      }
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)

export const removeAerolineFromDestination = createAsyncThunk(
  'destinations/removeAerolineFromDestination',
  async ({destinationId,id}, thunkAPI) => {
    try {
      const res = await removeAerolineDestination(id)
      console.log({ res }, "destinations/removeAerolineFromDestination")
      return {destinationId,id}
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)

export const removeHotelFromDestination = createAsyncThunk(
  'destinations/removeHotelFromDestination',
  async ({destinationId,id}, thunkAPI) => {
    try {
      const res = await removeHotelDestination(id)
      console.log({ res }, "destinations/removeHotelFromDestination")
      return {destinationId,id}
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)

