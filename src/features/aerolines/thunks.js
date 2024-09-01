import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  fetchAerolines,
  createAeroline,
  deleteAeroline,
  updateAeroline
} from '../../services/aerolines'


export const getAerolines = createAsyncThunk(
  'aerolines/fetchAerolines',
  async (thunkAPI) => {
    try {
      const res = await fetchAerolines()
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  },
)

export const addAeroline = createAsyncThunk(
  'aerolines/addAeroline',
  async (data,thunkAPI) => {
    try {
      const res = await createAeroline(data)
      return res.data[0]
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)


export const removeAeroline = createAsyncThunk(
  'aerolines/removeAeroline',
  async (id,thunkAPI) => {
    try {
      await deleteAeroline(id)
      return id
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)

export const editAeroline = createAsyncThunk(
  'aerolines/editAeroline',
  async ({id,...aeroline},thunkAPI) => {
    try {
      const res = await updateAeroline(id,aeroline)
      return res.data[0]
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)

