import { supabase } from "../../util/supabase";

interface Destination {
  name: string;
  country: string;
}

export const fetchDestinations = async () => {
  return await supabase.from("places").select(`
            *,
            places_hotels(
                *,
                hotels(*)
            ),
            tours(id,name),
            places_aerolines(*,aerolines(*))
        `);
};

export const createDestination = async (destination: Destination) => {
  return await supabase.from("places").insert([destination]).select(`
            *,
            places_hotels(
                *,
                hotels(*)
            ),
            tours(id,name),
            places_aerolines(*,aerolines(*))
        `);
};

export const addManyDestinations = async (destinations: Destination[]) => {
  return await supabase.from("places").insert(destinations).select(`
            *,
            places_hotels(
                *,
                hotels(*)
            ),
            tours(id,name),
            places_aerolines(*,aerolines(*))
        `);
};

export const updateDestination = async (
  id: number,
  destination: Destination
) => {
  return await supabase.from("places").update(destination).eq("id", id).select(`
            *,
            places_hotels(
                *,
                hotels(*)
            ),
            tours(id,name),
            places_aerolines(*,aerolines(*))
        `);
};

export const deleteDestination = async (id: number) => {
  return await supabase.from("places").delete().eq("id", id);
};

export const assignHotelsDestination = async (
  hotelPlaces: PlaceHotelTable[]
) => {
  return await supabase.from("places_hotels").insert(hotelPlaces).select(`
      *,
      hotels(*)
    `);
};
export const removeHotelDestination = async (id: number) => {
  return await supabase.from("places_hotels").delete().eq("id", id);
};
export const assignAerolinesDestination = async (
  aerolinePlace: PlaceAerolineTable[]
) => {
  return await supabase.from("places_aerolines").insert(aerolinePlace).select(`
      *,
      aerolines(*)
    
    `);
};
export const removeAerolineDestination = async (id: number) => {
  return await supabase.from("places_aerolines").delete().eq("id", id);
};
