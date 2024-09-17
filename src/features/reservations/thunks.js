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
  formatTours,
} from "../../util/util";
import { toast } from 'react-toastify';

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

      const res = await toast.promise(
        deleteReservation(id),
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


      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const editReservationStatus = createAsyncThunk("reservations/editReservationStatus",
  async ({ id, status }, thunkAPI) => {

    const res = await toast.promise(
      updateReservation(id, { status: status }),
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
              return `Se actualizó el estado de la reserva 😏`
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

    console.log(res)
    return { id, status };
  })

export const editReservation = createAsyncThunk(
  "reservations/editReservation",
  async ({ id, cotizationDetail, aerolinePrices, hotelPrices }, thunkAPI) => {
    try {

      const res = await toast.promise(
        updateReservation(
          id,
          formatCotizationToDatabase({ ...cotizationDetail, tours: formatTours(cotizationDetail.tours) })
        ),
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
        formatCotizationToDatabase({ ...cotizationDetail, tours: formatTours(cotizationDetail.tours) });

      const responseReservation = await toast.promise(
        createReservation(cotizationDetailFormattedToDatabase
        ),
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
                return `Se creó la reserva 😏`
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
