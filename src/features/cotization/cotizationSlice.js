import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AEROLINES, HOTELS, ISLA_SAONA, TRASLADO_PRICE } from '../../util/constants'
import { fetchClients } from '../../services/clients'


export const getClients = createAsyncThunk(
  'clients/fetchClients',
  async (thunkAPI) => {
    try {
      const res = await fetchClients()
      console.log({ res })
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  },
)


const initialState = {
  clients: [],
  clientError: null,
  clientStatus: 'idle',
  cotizationDetail: { adults: 1, days: 1, kids: 0, adultFee: 100, kidFee: 100, traslado: TRASLADO_PRICE, islaSaona: ISLA_SAONA },
  aerolinePrices: AEROLINES,
  hotelPrices: HOTELS
}

export const cotizationSlice = createSlice({
  name: 'cotization',
  initialState,
  reducers: {
    addReservation: (state, action) => {

    },
    setCotizationDetail: (state, action) => {
      state.cotizationDetail = action.payload
    },
    updateOnAttributeDetail: (state, { payload }) => {
      const { attribute, value } = payload
      state.cotizationDetail[attribute] = value
    },
    setAerolinePrices: (state, action) => {
      state.aerolinePrices = action.payload
    },
    setHotelPrices: (state, action) => {
      state.hotelPrices = action.payload
    },
    updateAerolineOption: (state, { payload }) => {
      state.aerolinePrices = state.aerolinePrices.map(aerolinePrice => aerolinePrice.name === payload.name ? payload : aerolinePrice)
    },
    updateHotelOption: (state, { payload }) => {
      state.hotelPrices = state.hotelPrices.map(hotelPrice => hotelPrice.name === payload.name ? payload : hotelPrice)
    }
  },
  extraReducers: (builder) => {

    builder.addCase(getClients.pending, (state, action) => {
      state.clientStatus = 'loading'
    })

    builder.addCase(getClients.fulfilled, (state, action) => {
      state.clients = action.payload
      state.clientStatus = 'successful'
    })

    builder.addCase(getClients.rejected, (state, action) => {
      state.clientStatus = 'failed'
      console.log("Error:",action)
      state.clientError = action.error
    })

  }
})

export const {
  setCotizationDetail,
  setAerolinePrices,
  setHotelPrices,
  updateAerolineOption,
  addReservation,
  updateHotelOption,
  updateOnAttributeDetail
} = cotizationSlice.actions

export default cotizationSlice.reducer