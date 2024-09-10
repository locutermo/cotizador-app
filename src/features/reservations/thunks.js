import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchReservations,
  createReservation,
  updateReservation,
  assignAerolineToReservation,
  assignHotelToReservation,
  updateAerolineByReservation,
  updateHotelByReservation,
  deleteAerolineByReservation,
  deleteHotelByReservation,
  deleteReservation,
} from "../../services/reservations";
import {
  formatAerolineReservationToDatabase,
  formatCotizationToDatabase,
  formatHotelReservationToDatabase,
} from "../../util/util";

export const getReservations = createAsyncThunk(
  "reservations/fetchReservations",
  async (thunkAPI) => {
    try {
      const res = await fetchReservations();
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const removeReservation = createAsyncThunk(
  "reservations/deleteReservation",
  async (id, thunkAPI) => {
    try {
      await deleteReservation(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const editReservation = createAsyncThunk(
  "reservations/editReservation",
  async ({ id, cotizationDetail, aerolinePrices, hotelPrices }, thunkAPI) => {
    try {
      const res = await updateReservation(
        id,
        formatCotizationToDatabase(cotizationDetail)
      );

      /**
       * Creacion de cotizaciones y vuelos
       */

      const aerolinesToAddFormatted = aerolinePrices.toAdd.map((element) => {
        return formatAerolineReservationToDatabase({
          ...element,
          reservations_id: id,
          aerolines_id: element.id,
        });
      });

      const hotelsToAddFormatted = hotelPrices.toAdd.map((element) => {
        return formatHotelReservationToDatabase({
          ...element,
          reservations_id: id,
          hotels_id: element.id,
        });
      });

      const aerolinesAddedResponses = await assignAerolineToReservation(
        aerolinesToAddFormatted.map(({ id, ...rest }) => {
          return { ...rest };
        })
      );
      const hotelsAddedResponses = await assignHotelToReservation(
        hotelsToAddFormatted.map(({ id, ...rest }) => {
          return { ...rest };
        })
      );

      /**
       * Eliminacion de cotizaciones de vuelos y hoteles
       */

      Promise.all(
        aerolinePrices.toDelete.map(({ table_id }) =>
          deleteAerolineByReservation(table_id)
        )
      );
      Promise.all(
        hotelPrices.toDelete.map(({ table_id }) =>
          deleteHotelByReservation(table_id)
        )
      );

      /**
       *  Actualizacion de cotizaciones de vuelos y hoteles
       */

      const aerolinesReservationFormatted = aerolinePrices.toUpdate.map(
        (element) => formatAerolineReservationToDatabase(element)
      );

      const hotelsReservationFormatted = hotelPrices.toUpdate.map((element) =>
        formatHotelReservationToDatabase(element)
      );

      const aerolinesUpdatedResponses = await Promise.all(
        aerolinesReservationFormatted.map(({ id, ...aeroline }) =>
          updateAerolineByReservation(id, aeroline)
        )
      );
      const hotelUpdateResponses = await Promise.all(
        hotelsReservationFormatted.map(({ id, ...hotel }) =>
          updateHotelByReservation(id, hotel)
        )
      );

      return {
        cotizationDetail: res.data[0],
        hotelPrices: {
          toAdd: hotelsAddedResponses.data,
          toUpdate: hotelUpdateResponses.map((e) => e.data[0]),
          toDelete: hotelPrices.toDelete,
        },
        aerolinePrices: {
          toAdd: aerolinesAddedResponses.data,
          toUpdate: aerolinesUpdatedResponses.map((e) => e.data[0]),
          toDelete: aerolinePrices.toDelete,
        },
      };
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const createReservationWithAerolinesAndHotels = createAsyncThunk(
  "reservations/createReservationWithAerolinesAndHotels",
  async ({ cotizationDetail, aerolinePrices, hotelPrices }, thunkAPI) => {
    try {
      const cotizationDetailFormattedToDatabase =
        formatCotizationToDatabase(cotizationDetail);
      const responseReservation = await createReservation(cotizationDetailFormattedToDatabase
      );
      const reservationCreated = responseReservation.data[0];
      const aerolinesReservationFiltered = aerolinePrices.filter(
        (e) => e.price > 0
      );
      const hotelsReservationFiltered = hotelPrices.filter((e) => e.price > 0);

      const aerolinesReservationFormatted = aerolinesReservationFiltered.map(
        (element) => {
          const { id, ...restFormatted } = formatAerolineReservationToDatabase({
            ...element,
            reservations_id: reservationCreated.id,
            aerolines_id: element.id,
          });

          return restFormatted;
        }
      );

      const hotelsReservationFormatted = hotelsReservationFiltered.map(
        (element) => {
          const { id, ...restFormatted } = formatHotelReservationToDatabase({
            ...element,
            reservations_id: reservationCreated.id,
            hotels_id: element.id,
          });

          return restFormatted;
        }
      );

      const responseAerolinesReservations = await assignAerolineToReservation(
        aerolinesReservationFormatted
      );
      const aerolinesReservationCreated = responseAerolinesReservations.data;
      const responseHotelsReservations = await assignHotelToReservation(
        hotelsReservationFormatted
      );
      const hotelsReservationCreated = responseHotelsReservations.data;

      return {
        ...reservationCreated,
        reservations_aerolines: aerolinesReservationCreated,
        reservations_hotels: hotelsReservationCreated,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);
