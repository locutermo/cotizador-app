export const formatClients = (data: any) => {
  return data?.map((element: any) => ({
    ...element,
    reservations: element.reservations ? element.reservations[0]?.count : 0
  }))
}

export const formatHotels = (data: any) => {

  return data?.map(({ reservations_hotels, ...element }: any) => ({
    ...element,
    reservations: reservations_hotels ? reservations_hotels[0]?.count : 0
  }))
}


export const formatCotizationToDatabase = (cotization: CotizationDetail): Reservation => {
  const {
    startDate,
    adultFee,
    customer,
    kidFee,
    traslado,
    islaSaona,
    santoDomingo,
    adults,
    days,
    places_id,
    kids,
    ...rest
  } = cotization

  return ({
    adults,
    kids,
    days,
    places_id,
    start_date: startDate,
    fee_adults: adultFee || 0,
    tours: {
      islaSaona,
      santoDomingo
    },
    fee_kids: kidFee,
    relocation: traslado,
    customer_id: customer
  })
}

export const formatAerolineReservationToDatabase = (reservation: any) => {
  const {
    priceByAdults,
    priceByKids,
    id,
    name,
    table_id,
    price,
    ...rest
  } = reservation

  return ({
    ...rest,
    price,
    id:table_id,
    adult_price: priceByAdults>0 ? parseInt(priceByAdults) : 0,
    kid_price: priceByKids>0 ? parseInt(priceByKids) : 0,
  })
}

export const formatHotelReservationToDatabase = (reservation: any) => {
  const {
    priceByAdults,
    id,
    priceByKids,
    name,
    table_id,
    price,
    ...rest
  } = reservation

  return ({
    ...rest,
    price,
    id:table_id,
    adult_price: priceByAdults>0 ? parseInt(priceByAdults) : 0,
    kid_price: priceByKids>0 ? parseInt(priceByKids) : 0,
  })
}


export const formatReservationWithDestinations = (data: ReservationTable): CotizationWithPrice => {
  const {
    places,
    reservations_hotels,
    reservations_aerolines,
    start_date,
    end_date,
    fee_adults,
    fee_kids,
    clients,
    relocation,
    tours,
    id,
    kids,
    days,
    adults,
    customer_id,
    places_id,
    ...element

  } = data
  return ({
    id,
    cotizationDetail: {
      ...element,
      kids,
      adults,
      days,
      place: places?.name,
      startDate: start_date,
      islaSaona: tours.islaSaona,
      santoDomingo: tours.santoDomingo,
      endDate: end_date,
      traslado: relocation,
      adultFee: fee_adults,
      kidFee: fee_kids,
      customer: customer_id,
      places_id,
      customerName: clients?.name
    },
    aerolinePrices: reservations_aerolines?.map(({ id, kid_price, adult_price, aerolines,price }) => ({price, table_id:id, id: aerolines.id, name: aerolines.name, priceByAdults: adult_price, priceByKids: kid_price||0 })),
    hotelPrices: reservations_hotels?.map(({ id, kid_price, adult_price, hotels,price }) => ({ price,table_id:id, id: hotels.id, name: hotels.name, priceByAdults: adult_price, priceByKids: kid_price||0 })),

  })
}

export const getNewPrices = (newArray: Option[], options: Option[], prices: AerolinePriceObject[] | HotelPriceObject[]): AerolinePriceObject[] | HotelPriceObject[] => {
  const newArrayWithName = newArray.map(e => e.label)

  const setSelected = new Set(newArrayWithName);
  const setPrevious = new Set(prices.map(e => e.name))

  const intersection = new Set([...setSelected].filter((x) => setPrevious.has(x)))
  let newPrices = prices.filter(aeroline => [...intersection].find(e => e === aeroline.name))


  const difference = new Set([...setSelected].filter(x => !setPrevious.has(x)))
  let differenceArray = Array.from(difference);

  let differenceOptions = differenceArray.map(e => {
    const foundPrice = prices.find(price => price.name === e)
    const foundOption = options.find(option => option.label === e)
    if (foundPrice) return foundPrice
    return {id:foundOption?.value ?  parseInt(foundOption.value):0, price:0,name:foundOption?.label||'' , table_id: 0, priceByAdults: 0, priceByKids: 0 }
  })

  if (differenceOptions.length > 0) {
    newPrices.push(...differenceOptions)
  }

  return newPrices;
}