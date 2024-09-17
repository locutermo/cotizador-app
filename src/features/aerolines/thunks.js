import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  fetchAerolines,
  createAeroline,
  deleteAeroline,
  updateAeroline
} from '../../services/aerolines'
import { toast } from 'react-toastify';


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
      

      const res = await toast.promise(
        createAeroline(data),
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
                return `Se registró la aerolinea 😏`
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


export const removeAeroline = createAsyncThunk(
  'aerolines/removeAeroline',
  async (id,thunkAPI) => {
    try {


      const res = await toast.promise(
        deleteAeroline(id),
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
                return `Se eliminó la aerolinea 😏`
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

export const editAeroline = createAsyncThunk(
  'aerolines/editAeroline',
  async ({id,...aeroline},thunkAPI) => {
    try {

      const res = await toast.promise(
        updateAeroline(id,aeroline),
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
                return `Se actualizó la aerolinea 😏`
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

