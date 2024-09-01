import { supabase } from '../../util/supabase'

interface Hotel {
    name: string,
    stars: Number
}

export const fetchHotels = async () => {

    return await supabase
        .from('hotels')
        .select()
}

export const createHotel = async (hotel: Hotel) => {
    return await supabase
        .from('hotels')
        .insert([
            hotel,
        ])
        .select()
}

export const addManyHotels = async (hotels: Hotel[]) => {
    return await supabase
        .from('hotels')
        .insert(hotels)
        .select()
}

export const updateHotel = async (id: number, hotel: Hotel) => {
    return await supabase
        .from('hotels')
        .update(hotel)
        .eq('id', id)
        .select()
}

export const deleteHotel = async (id: number) => {
    return await supabase
        .from('hotels')
        .delete()
        .eq('id', id)
}



