import { supabase } from '../../util/supabase'

interface Aeroline {
    name: string,
}

export const fetchAerolines = async () => {

    return await supabase
        .from('aerolines')
        .select()
}

export const createAeroline = async (aeroline: Aeroline) => {
    return await supabase
        .from('aerolines')
        .insert([
            aeroline,
        ])
        .select()
}

export const addManyAerolines = async (aerolines: Aeroline[]) => {
    return await supabase
        .from('aerolines')
        .insert(aerolines)
        .select()
}

export const updateAeroline = async (id: number, aeroline: Aeroline) => {
    return await supabase
        .from('aerolines')
        .update(aeroline)
        .eq('id', id)
        .select()
}

export const deleteAeroline = async (id: number) => {
    return await supabase
        .from('aerolines')
        .delete()
        .eq('id', id)
}



