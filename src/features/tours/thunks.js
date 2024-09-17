import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  fetchTours,
  createTour,
  deleteTour,
  updateTour
} from '../../services/tours'
import { toast } from 'react-toastify';


export const getTours = createAsyncThunk(
  'tours/fetchTours',
  async (thunkAPI) => {
    try {
      const res = await fetchTours()
      console.log({ res })
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  },
)

export const addTour = createAsyncThunk(
  'tours/addTour',
  async (data, thunkAPI) => {
    try {
      // const res = await createTour(data)
      const res = await toast.promise(
        createTour(data),
        {
          pending: {
            render() {
              return "Cargando"
            },
            icon: false,
          },
          success: {
            render({ data }) {
              if (data.status === 201 || data.status === 200)
                return `Se registró correctamente 😏`
              return `Ocurrió un error 😞`

            },
            icon: "🚀",
          },
          error: {
            render({ data }) {
              return `Ocurrió un error`
            }
          }
        }
      );

      return res.data[0]
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)


export const removeTour = createAsyncThunk(
  'tours/removeTour',
  async (id, thunkAPI) => {
    try {

      const res = await toast.promise(
        deleteTour(id),
        {
          pending: {
            render() {
              return "Cargando"
            },
            icon: false,
          },
          success: {
            render({ data }) {
              if (data.status === 201 || data.status === 200 || data.status === 204)
                return `Se eliminó correctamente 😏`
              return `Ocurrió un error 😞`

            },
            icon: "🚀",
          },
          error: {
            render({ data }) {
              return `Ocurrió un error`
            }
          }
        }
      );

      return id
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)

export const editTour = createAsyncThunk(
  'tours/editTour',
  async ({ id, ...tour }, thunkAPI) => {
    try {
      
      const res = await toast.promise(
        updateTour(id, tour),
        {
          pending: {
            render() {
              return "Cargando"
            },
            icon: false,
          },
          success: {
            render({ data }) {
              if (data.status === 201 || data.status === 200 || data.status === 204)
                return `Se actualizó correctamente 😏`
              return `Ocurrió un error 😞`

            },
            icon: "🚀",
          },
          error: {
            render({ data }) {
              return `Ocurrió un error`
            }
          }
        }
      );

      return res.data[0]
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)

