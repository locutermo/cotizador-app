import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase } from "../../util/supabase";

export const createReservation = async (reservation: Reservation) => {
  return await supabase.from("reservations").insert([reservation]).select(`
        *,
        clients(name),
        places(name,country)
    `);
};

export const updateReservation = async (
  id: string,
  reservation: Reservation
) => {
  return await supabase.from("reservations").update(reservation).eq("id", id)
    .select(`
        *,
        clients(name),
        places(name,country)
    `);
};

export const assignAerolineToReservation = async (
  aerolines: AerolineReservations[]
) => {
  return await supabase.from("reservations_aerolines").insert(aerolines)
    .select(`
        *,
        aerolines (id,name)
    `);
};

export const updateAerolineByReservation = async (
  id: number,
  aerolineReservation: AerolineReservations
) => {
  return await supabase
    .from("reservations_aerolines")
    .update(aerolineReservation)
    .eq("id", id).select(`
        *,
        aerolines (id,name)
    `);
};

export const deleteAerolineByReservation = async (id: number) => {
    return await supabase.from("reservations_aerolines").delete().eq("id", id);
  };

export const assignHotelToReservation = async (hotels: HotelReservations[]) => {
  return await supabase.from("reservations_hotels").insert(hotels).select(`
        *,
        hotels(id,name) 
    `);
};

export const updateHotelByReservation = async (
  id: number,
  hotelReservation: HotelReservations
) => {
  return await supabase
    .from("reservations_hotels")
    .update(hotelReservation)
    .eq("id", id).select(`
          *,
          hotels (id,name)
      `);
};

export const deleteHotelByReservation = async (id: number) => {
  return await supabase.from("reservations_hotels").delete().eq("id", id);
};

export const fetchReservations = async (): Promise<
  PostgrestSingleResponse<ReservationTable[]>
> => {
  return await supabase.from("reservations").select(`
                *,
                clients(
                    name
                ),
                places (
                    name,
                    country
                ),
                reservations_aerolines (
                    id,
                    price,
                    adult_price,
                    kid_price,
                    aerolines (
                        id,
                        name
                    )
                ),
                reservations_hotels (
                    id,
                    price,
                    adult_price,
                    kid_price,
                    hotels (
                        id,
                        name
                    )
                )
             
        `);
};
