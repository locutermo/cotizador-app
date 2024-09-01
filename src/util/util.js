export const formatClients = (data) => {

  console.log({ data })

  return data?.map(element => ({
    ...element,
    reservations: element.reservations ? element.reservations[0]?.count : 0
  }))
}


export const formatCotizationToDatabase = (cotization) => {
  const {
    startDate,
    adultFee,
    customer,
    kidFee,
    traslado,
    islaSaona,
    santoDomingo,
    ...rest
  } = cotization

  return ({
    ...rest,
    start_date: startDate || null,
    fee_adults: adultFee || 0,
    tours: {
      islaSaona,
      santoDomingo
    },
    fee_kids: kidFee,
    relocation: traslado,
    customer_id: parseInt(customer)
  })
}

export const formatAerolineReservationToDatabase = (reservation) => {
  const {
    priceByAdults,
    priceByKids,
    name,
    ...rest
  } = reservation

  return ({
    ...rest,
    adult_price: parseInt(priceByAdults),
    kid_price: parseInt(priceByKids),
  })
}

export const formatHotelReservationToDatabase = (reservation) => {
  const {
    priceByAdults,
    priceByKids,
    name,
    ...rest
  } = reservation

  return ({
    ...rest,
    adult_price: parseInt(priceByAdults),
    kid_price: parseInt(priceByKids),
  })
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

    }, index) => ({
      ...element,
      place: places?.name,
      aerolinePrices: reservations_aerolines,
      hotelPrices: reservations_hotels,
      startDate: start_date,
      endDate: end_date,
      customer: clients?.name
    }))
}

export const formatReservationWithDestinations = (data) => {
  const {
    places,
    reservations_hotels,
    reservations_aerolines,
    start_date,
    end_date,
    clients,
    ...element

  } = data

  return ({
    ...element,
    place: places?.name,
    aerolinePrices: reservations_aerolines,
    hotelPrices: reservations_hotels,
    startDate: start_date,
    endDate: end_date,
    customer: clients?.name

  })
}