import { supabase } from '../../util/supabase'

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