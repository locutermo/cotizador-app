import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  fetchHotels,
  createHotel,
  deleteHotel,
  updateHotel
} from '../../services/hotels'

import { toast } from 'react-toastify';

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
      
      const res = await toast.promise(
        createHotel(data),
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
                return `Se registró el hotel 😏`
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


export const removeHotel = createAsyncThunk(
  'hotels/removeHotel',
  async (id,thunkAPI) => {
    try {

      const res = await toast.promise(
        deleteHotel(id),
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
                return `Se eliminó el hotel 😏`
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

export const editHotel = createAsyncThunk(
  'hotels/editHotel',
  async ({id,...hotel},thunkAPI) => {
    try {
      const res = await toast.promise(
        updateHotel(id,hotel),
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
                return `Se actualizó el hotel 😏`
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

