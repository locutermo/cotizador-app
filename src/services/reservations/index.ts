import { supabase } from '../../util/supabase'

interface Reservation {
    adults: Number;
    kids: Number;
    start_date: Date;
    end_date: Date;
    days: Number;
    fee_adults: Number;
    fee_kids: Number;
    das: Number;
    relocation: Number;
    tours?: {
        islaSaona: Number;
        santoDomingo: Number;
    },
    customer_id: Number;
    places_id: Number;
}

interface AerolineReservations {
    reservations_id: String;
    aerolines_id: Number;
    price: Number;
    adult_price: Number;
    kid_price: Number;
}

interface HotelReservations {
    reservations_id: String;
    hotel_id: Number;
    price: Number;
    adult_price: Number;
    kid_price: Number;
}

export const createReservation = async (reservation: Reservation) => {
    console.log("Se creata:", reservation)
    return await supabase.from('reservations').insert([reservation]).select(`
        *,
        clients(name),
        places(name,country)
    `)
}

export const assignAerolineToReservation = async (aerolines: AerolineReservations[]) => {
    console.log("Se asignara", aerolines)
    return await supabase.from('reservations_aerolines').insert(aerolines).select(`
        *,
        aerolines (name)
    `)
}

export const assignHotelToReservation = async (hotels: HotelReservations[]) => {
    return await supabase.from('reservations_hotels').insert(hotels).select(`
        *,
        hotels(name) 
    `)
}

export const fetchReservations = async () => {
    return await supabase
        .from('reservations')
        .select(`
                *,
                clients(
                    name
                ),
                places (
                    name,
                    country
                ),
                reservations_aerolines (
                    price,
                    adult_price,
                    kid_price,
                    aerolines (
                        name
                    )
                ),
                reservations_hotels (
                    price,
                    adult_price,
                    kid_price,
                    hotels (
                        name
                    )
                )
             
        `)
}