import { supabase } from '../../util/supabase'



export const fetchTours = async () => {

    return await supabase
        .from('tours')
        .select(`
            *,
            places(
                id,name
            )
        `)
}

export const createTour = async (tour: TourTable) => {
    return await supabase
        .from('tours')
        .insert([
            tour,
        ])
        .select(`
            *,
            places(
                id,name
            )
        `)
}

export const addManyTours = async (tours: TourTable[]) => {
    return await supabase
        .from('tours')
        .insert(tours)
        .select(`
                *, places(id,name)
            `)
}

export const updateTour = async (id: number, tour: TourTable) => {
    return await supabase
        .from('tours')
        .update(tour)
        .eq('id', id)
        .select(`
                *,places(id,name)
            `)
}

export const deleteTour = async (id: number) => {
    return await supabase
        .from('tours')
        .delete()
        .eq('id', id)
}



