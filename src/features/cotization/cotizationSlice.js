import { createSlice } from '@reduxjs/toolkit'
import { ISLA_SAONA, SANTO_DOMINGO, TRASLADO_PRICE } from '../../util/constants'


const initialState = {
  cotizationDetail: {
    adults: 1,
    days: 1,
    kids: 0,
    adultFee: 100,
    kidFee: 100,
    traslado: TRASLADO_PRICE,
    islaSaona: ISLA_SAONA,
    santoDomingo: SANTO_DOMINGO
  },
  aerolinePrices: [],
  hotelPrices: []
}

export const cotizationSlice = createSlice({
  name: 'cotization',
  initialState,
  reducers: {
    clean: (state, action) => {
      state.cotizationDetail = {
        adults: 1,
        days: 1,
        kids: 0,
        adultFee: 100,
        kidFee: 100,
        traslado: TRASLADO_PRICE,
        islaSaona: ISLA_SAONA,
        santoDomingo: SANTO_DOMINGO,
        customer:''
      }
      state.aerolinePrices = []
      state.hotelPrices = []

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


  }
})

export const {
  clean,
  setCotizationDetail,
  setAerolinePrices,
  setHotelPrices,
  updateAerolineOption,
  updateHotelOption,
  updateOnAttributeDetail
} = cotizationSlice.actions

export default cotizationSlice.reducer