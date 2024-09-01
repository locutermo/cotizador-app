import { supabase } from '../../util/supabase'

interface Client {
    name: string,
}

export const fetchClients = async () => {

    return await supabase
        .from('clients')
        .select(`
            *,
            reservations(count)    
        `)
}

export const fetchClientsReservations = async () => {
    return await supabase
        .from('clients')
        .select(`
            name,
            reservations (
                start_date,
                end_date,
                fee_adults,
                fee_kids,
                relocation,
                tours,
                adults,
                kids,
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
                )
             
            )
        `)
}

export const createClient = async (client: Client) => {
    return await supabase
        .from('clients')
        .insert([
            client,
        ])
        .select()
}

export const addManyClients = async (clients: Client[]) => {
    return await supabase
        .from('clients')
        .insert(clients)
        .select()
}

export const updateClient = async (id: number, client: Client) => {
    return await supabase
        .from('clients')
        .update(client)
        .eq('id', id)
        .select()
}

export const deleteClient = async (id: number) => {
    return await supabase
        .from('clients')
        .delete()
        .eq('id', id)
}



