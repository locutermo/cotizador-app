import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  fetchTours,
  createTour,
  deleteTour,
  updateTour
} from '../../services/tours'
import { formatTourToTable } from '../../util/util'


export const getTours = createAsyncThunk(
  'tours/fetchTours',
  async (thunkAPI) => {
    try {
      const res = await fetchTours()
      console.log({res})
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  },
)

export const addTour = createAsyncThunk(
  'tours/addTour',
  async (data,thunkAPI) => {
    try {
      const res = await createTour(data)
      console.log({res,data})
      return res.data[0]
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)


export const removeTour = createAsyncThunk(
  'tours/removeTour',
  async (id,thunkAPI) => {
    try {
      await deleteTour(id)
      return id
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)

export const editTour = createAsyncThunk(
  'tours/editTour',
  async ({id,...tour},thunkAPI) => {
    try {
      const res = await updateTour(id,tour)
      console.log({res,tour,id})
      return res.data[0]
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)

