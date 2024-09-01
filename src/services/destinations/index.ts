import { supabase } from '../../util/supabase'

interface Destination {
    name: string,
    country:string
}

export const fetchDestinations = async () => {

    return await supabase
        .from('places')
        .select()
}

export const createDestination = async (destination: Destination) => {
    return await supabase
        .from('places')
        .insert([
            destination,
        ])
        .select()
}

export const addManyDestinations = async (destinations: Destination[]) => {
    return await supabase
        .from('places')
        .insert(destinations)
        .select()
}

export const updateDestination = async (id: number, destination: Destination) => {
    return await supabase
        .from('places')
        .update(destination)
        .eq('id', id)
        .select()
}

export const deleteDestination = async (id: number) => {
    return await supabase
        .from('places')
        .delete()
        .eq('id', id)
}



