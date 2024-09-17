import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  fetchClients,
  fetchClientsReservations,
  createClient,
  deleteClient,
  updateClient
} from '../../services/clients'
import { toast } from 'react-toastify';

export const getClients = createAsyncThunk(
  'clients/fetchClients',
  async (thunkAPI) => {
    try {
      const res = await fetchClients()
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  },
)

export const addClient = createAsyncThunk(
  'clients/addClient',
  async (data,thunkAPI) => {
    try {

      const res = await toast.promise(
        createClient(data),
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
                return `Se registró el cliente 😏`
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


export const removeClient = createAsyncThunk(
  'clients/removeClient',
  async (id,thunkAPI) => {
    try {
      const res = await toast.promise(
        deleteClient(id),
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

export const editClient = createAsyncThunk(
  'clients/editClient',
  async ({id,...client},thunkAPI) => {
    try {
      const res = await toast.promise(
        updateClient(id,client),
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
      return res.data[0]
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)


export const getClientsReservations = createAsyncThunk(
  'clients/fetchClientsReservations',
  async (thunkAPI) => {
    try {
      const res = await fetchClientsReservations()
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  },
)
