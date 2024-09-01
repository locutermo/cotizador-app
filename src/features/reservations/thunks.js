import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  fetchReservations,
  createReservation,
  assignAerolineToReservation,
  assignHotelToReservation
} from '../../services/reservations'
import { formatAerolineReservationToDatabase, formatCotizationToDatabase, formatHotelReservationToDatabase } from '../../util/util'


export const getReservations = createAsyncThunk(
  'clients/fetchReservations',
  async (thunkAPI) => {
    try {
      const res = await fetchReservations()
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  },
)


export const createReservationWithAerolinesAndHotels = createAsyncThunk(
  'reservations/createReservationWithAerolinesAndHotels',
  async ({ cotizationDetail, aerolinePrices, hotelPrices }, thunkAPI) => {
    try {
      const cotizationDetailFormattedToDatabase = formatCotizationToDatabase(cotizationDetail)
      const responseReservation = await createReservation({ ...cotizationDetailFormattedToDatabase, places_id: 1 })
      const reservationCreated = responseReservation.data[0]
      const aerolinesReservationFiltered = aerolinePrices.filter(e => e.price)
      const hotelsReservationFiltered = hotelPrices.filter(e => e.price)

      const aerolinesReservationFormatted = aerolinesReservationFiltered.map(element => {
        return formatAerolineReservationToDatabase({
          ...element,
          reservations_id: reservationCreated.id,
          aerolines_id: 1
        })
      })

      const hotelsReservationFormatted = hotelsReservationFiltered.map(element => {
        return formatHotelReservationToDatabase({
          ...element,
          reservations_id: reservationCreated.id,
          hotels_id: 1
        })
      })
      



      const responseAerolinesReservations = await assignAerolineToReservation(aerolinesReservationFormatted)
      const aerolinesReservationCreated = responseAerolinesReservations.data
      const responseHotelsReservations = await assignHotelToReservation(hotelsReservationFormatted)
      const hotelsReservationCreated = responseHotelsReservations.data
      

      return {
        ...reservationCreated,
        reservations_aerolines:aerolinesReservationCreated,
        reservations_hotels:hotelsReservationCreated
      }
      

    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  },
)