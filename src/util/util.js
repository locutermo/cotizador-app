export const formatClients = (data) => {

  console.log({data})

    return data?.map(element => ({
      ...element,
      reservations: element.reservations ? element.reservations[0]?.count : 0
    }))
  }


  export const formatReservations = (data) => {
    return data?.map((
      {
        places,
        reservations_hotels,
        reservations_aerolines,
        start_date,
        end_date,
        clients,
        ...element

      },index) => ({
      ...element,
      place:places.name,
      aerolinePrices: reservations_aerolines,
      hotelPrices: reservations_hotels,
      startDate: start_date,
      endDate:end_date,
      customer:clients.name
    }))
  }