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
import { toast } from 'react-toastify';


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

      const res = await toast.promise(
        createDestination(data),
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


export const removeDestination = createAsyncThunk(
  'destinations/removeDestination',
  async (id, thunkAPI) => {
    try {

      const res = await toast.promise(
        deleteDestination(id),
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

export const editDestination = createAsyncThunk(
  'destinations/editDestination',
  async ({ id, ...destination }, thunkAPI) => {
    try {

      const res = await toast.promise(
        updateDestination(id, destination),
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

export const assignHotelToDestination = createAsyncThunk(
  'destinations/assignHotelToDestination',
  async ({id,items}, thunkAPI) => {
    try {

      const res = await toast.promise(
        assignHotelsDestination(items),
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
                return `Se asignó el hotel 😏`
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

      
      const res = await toast.promise(
        assignAerolinesDestination(items),
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
                return `Se asignó la aerolínea 😏`
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

      const res = await toast.promise(
        removeAerolineDestination(id),
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
                return `Se retiró la aerolínea al destino😏`
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
      

      const res = await toast.promise(
        removeHotelDestination(id),
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
                return `Se retiró el hotel al destino😏`
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

      return {destinationId,id}
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)

