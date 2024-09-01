import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  fetchClients,
  fetchClientsReservations,
  createClient,
  deleteClient,
  updateClient
} from '../../services/clients'


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
      const res = await createClient(data)
      console.log("Add client",{res:res.data[0]})
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
      const res = await deleteClient(id)
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
      const res = await updateClient(id,client)
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
