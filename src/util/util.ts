import { STATUS } from "./constants";

export const formatClients = (data: any) => {
  return data?.map((element: any) => ({
    ...element,
    reservations: element.reservations ? element.reservations[0]?.count : 0,
  }));
};

export const formatHotels = (data: any) => {
  return data?.map(({ reservations_hotels, ...element }: any) => ({
    ...element,
    reservations: reservations_hotels ? reservations_hotels[0]?.count : 0,
  }));
};

export const formatCotizationToDatabase = (
  cotization: CotizationDetail
): Reservation => {
  const {
    startDate,
    adultFee,
    customer,
    kidFee,
    traslado,
    adults,
    days,
    placeId,
    kids,
    tours,
    status,
  } = cotization;

  return {
    adults,
    kids,
    days,
    places_id: placeId,
    start_date: startDate,
    fee_adults: adultFee || 0,
    tours: tours || {},
    fee_kids: kidFee,
    relocation: traslado,
    customer_id: customer,
    status,
  };
};

export const formatAerolineReservationToDatabase = (reservation: any) => {
  const { priceByAdults, priceByKids, id, name, table_id, price, ...rest } =
    reservation;

  return {
    ...rest,
    price,
    id: table_id,
    adult_price: priceByAdults > 0 ? parseInt(priceByAdults) : 0,
    kid_price: priceByKids > 0 ? parseInt(priceByKids) : 0,
  };
};

export const formatHotelReservationToDatabase = (reservation: any) => {
  const { priceByAdults, id, priceByKids, name, table_id, price, ...rest } =
    reservation;

  return {
    ...rest,
    price,
    id: table_id,
    adult_price: priceByAdults > 0 ? parseInt(priceByAdults) : 0,
    kid_price: priceByKids > 0 ? parseInt(priceByKids) : 0,
  };
};

export const formatReservationWithDestinations = (
  data: ReservationTable
): CotizationWithPrice => {
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
  } = data;
  return {
    id,
    cotizationDetail: {
      ...element,
      kids,
      adults,
      days,
      place: places?.name,
      startDate: start_date,
      tours,
      endDate: end_date,
      traslado: relocation,
      adultFee: fee_adults,
      kidFee: fee_kids,
      customer: customer_id,
      placeId: places_id,
      customerName: clients?.name,
    },
    aerolinePrices: reservations_aerolines?.map(
      ({ id, kid_price, adult_price, aerolines, price }) => ({
        price,
        table_id: id,
        id: aerolines.id,
        name: aerolines.name,
        priceByAdults: adult_price,
        priceByKids: kid_price || 0,
      })
    ),
    hotelPrices: reservations_hotels?.map(
      ({ id, kid_price, adult_price, hotels, price }) => ({
        price,
        table_id: id,
        id: hotels.id,
        name: hotels.name,
        priceByAdults: adult_price,
        priceByKids: kid_price || 0,
      })
    ),
  };
};

export const getNewPrices = (
  newArray: Option[],
  options: Option[],
  prices: AerolinePriceObject[] | HotelPriceObject[]
): AerolinePriceObject[] | HotelPriceObject[] => {
  console.log({ newArray, options, prices });
  const newArrayWithId = newArray.filter((e) => e).map((e) => e.value);

  const setSelected = new Set(newArrayWithId);
  const setPrevious = new Set(prices.map((e) => e.id));

  const intersection = new Set(
    [...setSelected].filter((x) => setPrevious.has(x))
  );
  let newPrices = prices.filter((aeroline) =>
    [...intersection].find((e) => parseInt(e) === aeroline.id)
  );

  const difference = new Set(
    [...setSelected].filter((x) => !setPrevious.has(x))
  );
  let differenceArray = Array.from(difference);

  let differenceOptions = differenceArray.map((e) => {
    const foundPrice = prices.find((price) => price.id === parseInt(e));
    const foundOption = options.find((option) => option.value === e);
    if (foundPrice) return foundPrice;
    return {
      id: foundOption?.value ? parseInt(foundOption.value) : 0,
      price: 0,
      name: foundOption?.label || "",
      table_id: 0,
      priceByAdults: 0,
      priceByKids: 0,
    };
  });

  if (differenceOptions.length > 0) {
    newPrices.push(...differenceOptions);
  }

  return newPrices;
};

export const formatPlaceWithAerolineAndHotelToObject = (
  place: DestinationWithAerolinesAndHotelsTable
): DestinationWithAerolinesAndHotelsObject => {
  const { id, name, country, places_hotels, places_aerolines, tours } = place;
  console.log({ tours });
  return {
    id,
    country,
    name,
    aerolines: places_aerolines.map((e) => formatPlaceAerolineToObject(e)),
    hotels: places_hotels.map((e) => formatPlaceHotelToObject(e)),
    tours,
  };
};

export const formatPlaceAerolineToObject = (
  place_aeroline: PlaceAerolineTable
): PlaceAerolineObject => {
  const { id, aerolines_id, aerolines, places_id } = place_aeroline;

  let newObject: PlaceAerolineObject = {
    id,
    placeId: places_id,
    tableId: aerolines_id,
  };

  if (aerolines) newObject["name"] = aerolines.name;

  return newObject;
};

export const formatPlaceHotelToObject = (
  place_hotel: PlaceHotelTable
): PlaceHotelObject => {
  const { id, hotels_id, hotels, places_id, stars } = place_hotel;

  let newObject: PlaceHotelObject = {
    id,
    placeId: places_id,
    tableId: hotels_id,
  };

  if (hotels) newObject["name"] = hotels.name;
  if (stars) newObject["stars"] = stars;

  return newObject;
};

export const formatTourToObject = (tour: TourTable): TourObject => {
  const { id, places_id, name, places, kidPrice, adultPrice } = tour;
  const newObjext: TourObject = {
    placeId: places_id,
    name,
    kidPrice,
    adultPrice,
  };
  if (places) newObjext["placeName"] = places.name;
  if (id) newObjext["id"] = id;

  return {
    id,
    placeId: places_id,
    placeName: places?.name,
    kidPrice,
    adultPrice,
    name,
  };
};

export const formatTourToTable = (tour: TourObject): TourTable => {
  const { placeId, name, kidPrice, adultPrice } = tour;
  let newObject: TourTable = {
    places_id: placeId,
    name,
    kidPrice,
    adultPrice,
  };

  if (tour.id) newObject["id"] = tour.id;

  return newObject;
};

export const formatTours = (tours: any) => {
  return Object.entries(tours).reduce((acc: any, [id, tour]) => {
    if (tour !== null) {
      acc[id] = tour;
    }
    return acc;
  }, {});
};

export const convertTourFormat = (originalTours: any) => {
  if (!originalTours) return null;
  if (Object.keys(originalTours).length !== 0) {
    const convertedTours = Object.entries(originalTours)
      .map(([id, tour]) => {
        if (tour) {
          return { id, ...tour };
        }

        return null;
      })
      .filter((tour: any) => tour?.adultPrice > 0);
    return convertedTours;
  }

  return [];
};

export const totalOperativity = (
  minAerolinePrice: string,
  hotelPrice: string,
  traslado: string,
  tourPrices: string
) => {
  return (
    (!isNaN(parseInt(minAerolinePrice)) ? parseInt(minAerolinePrice) : 0) +
    (!isNaN(parseInt(traslado)) ? parseInt(traslado) : 0) +
    (!isNaN(parseInt(hotelPrice)) ? parseInt(hotelPrice) : 0) +
    (!isNaN(parseInt(tourPrices)) ? parseInt(tourPrices) : 0)
  );
};

export const getColorByStatus = (status: string) => {
  switch (status) {
    case STATUS.COTIZADO:
      return "bg-slate-500";
    case STATUS.PENDIENTE:
      return "bg-orange-500";
    case STATUS.RESERVADO:
      return "bg-red-500";
    case STATUS["EN CURSO"]:
      return "bg-blue-500";
    case STATUS.FINALIZADO:
      return "bg-green-800";
    default:
      return "bg-slate-500";
  }
};

export const getTotalPriceByHotels = (
  hotels: any,
  aerolinePrice: number,
  adultTraslado: number,
  kidTraslado: number,
  tourAdultPrice: number,
  tourKidPrice: number,
  adultFee: number,
  kidFee: number
) => {
  const adultsPrices = [aerolinePrice, adultTraslado, tourAdultPrice].reduce(
    (acc, current) => acc + current,
    0
  );
  const kidsPrices = [aerolinePrice, kidTraslado, tourKidPrice].reduce(
    (acc, current) => acc + current,
    0
  );
  // (9-(number % 10)) + number
  return hotels.map(({ name, priceByAdults, priceByKids }: any) => {

    const totalAdults = Math.round(priceByAdults + adultsPrices + adultFee * 1.18)
    const totalKids = Math.round(priceByKids + kidsPrices + kidFee * 1.18)

    return {
      name: name,
      services: [
        {
          name: "Boleto aereo",
          adultPrice: aerolinePrice,
          kidPrice: aerolinePrice,
        },
        {
          name,
          adultPrice: priceByAdults,
          kidPrice: priceByKids,
        },
        {
          name: "Traslado Compartido",
          adultPrice: adultTraslado,
          kidPrice: kidTraslado,
        },
        {
          name: "Sub Total",
          adultPrice: priceByAdults + adultsPrices,
          kidPrice: priceByKids + kidsPrices,
        },
        {
          name: "Fee",
          adultPrice: adultFee,
          kidPrice: kidFee,
        },
        {
          name: "IGV (Sobre Fee)",
          adultPrice: (adultFee * 0.18).toFixed(2),
          kidPrice: (kidFee * 0.18).toFixed(2),
        },
        {
          name: "Total",
          adultPrice: priceByAdults + adultsPrices + adultFee * 1.18,
          kidPrice: priceByKids + kidsPrices + kidFee * 1.18,
        },
      ],
      totalByAdults:(9-(totalAdults % 10)) + totalAdults ,
      totalByKids: (9-(totalKids % 10)) + totalKids
    };
  });
};
