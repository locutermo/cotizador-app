interface CotizationDetail {
  adults: number;
  days: number;
  kids: number;
  adultFee: number;
  kidFee: number;
  traslado: number;
  customer: number;
  startDate?: string;
  endDate?: string;
  place?: string;
  created_at?: string;
  placeId: number;
  customerName?: string;
  tours: any;
  status: string;
}

interface AerolinePrice {
  id: number;
  priceByAdults: number;
  priceByKids: number;
}

interface AerolinePriceTable {
  id: number;
  price: number;
  kid_price: number;
  adult_price: number;
  aerolines: {
    name: string;
    id: number;
  };
}

interface AerolinePriceObject {
  table_id: number;
  name: string;
  price: number;
  priceByAdults: number;
  priceByKids: number;
  id?: number;
}

/**
 * Datos del Hotel Price que llega desde la BD
 */
interface HotelPriceTable {
  id: number;
  kid_price: number;
  adult_price: number;
  price: number;
  hotels: {
    name: string;
    id: number;
  };
}
/**
 * Datos del Hotel Price que se usa en la app
 */
interface HotelPriceObject {
  price: number;
  id: number;
  name: string;
  table_id: number;
  priceByAdults: number;
  priceByKids: number;
}

interface CotizationWithPrice {
  id: string;
  cotizationDetail: CotizationDetail;
  aerolinePrices: AerolinePriceObject[];
  hotelPrices: HotelPriceObject[];
}

/** Database interfaces */
// Tables to insert
interface Reservation {
  adults: Number;
  kids: Number;
  start_date?: string;
  end_date?: string;
  days: Number;
  fee_adults: Number;
  fee_kids: Number;
  relocation: Number;
  tours?: {
    islaSaona: Number;
    santoDomingo: Number;
  };
  customer_id: Number;
  places_id: Number;
  status:string;
}

interface AerolineReservations {
  reservations_id?: String;
  aerolines_id: Number;
  price: Number;
  adult_price: Number;
  kid_price: Number;
}
interface HotelReservations {
  reservations_id?: String;
  hotel_id: Number;
  price: Number;
  adult_price: Number;
  kid_price: Number;
}

// Tables Retrieve
interface ReservationTable {
  id: string;
  customer_id: number;
  places_id: number;
  places: {
    name: string;
  };
  reservations_hotels: HotelPriceTable[];
  reservations_aerolines: AerolinePriceTable[];
  start_date: string;
  end_date: string;
  fee_adults: number;
  days: number;
  fee_kids: number;
  clients: {
    name: string;
  };
  kids: number;
  adults: number;
  relocation: number;
  tours: {
    islaSaona: number;
    santoDomingo: number;
  };
  status:string;
}

/**
 * Destinations with Aerolines and hotel
 */
interface AerolineTable {
  id: number;
  name: string;
  created_at?: string;
}
interface HotelTable {
  id: number;
  stars?: number;
  name: string;
  created_at?: string;
}

interface DestinationWithAerolinesAndHotelsTable {
  country: string;
  created_at: string;
  id: number;
  name: string;
  places_aerolines: PlaceAerolineTable[];
  places_hotels: PlaceHotelTable[];
  tours: DefaultTable[]
}

interface DestinationWithAerolinesAndHotelsObject {
    country: string;
    id: number;
    name: string;
    aerolines: PlaceAerolineObject[];
    hotels: PlaceHotelObject[],
    tours: DefaultTable[]
  }

interface PlaceAerolineTable {
  id?: number;
  aerolines_id: number;
  aerolines?: AerolineTable;
  places_id: number;
  created_at?: string;
}

interface PlaceAerolineObject {
  id?: number;
  placeId: number;
  tableId: number;
  name?: string;
}

interface PlaceHotelTable {
  id?: number;
  hotels_id: number;
  places_id: number;
  created_at?: string;
  hotels?: HotelTable;
  stars?: number;
}

interface PlaceHotelObject {
  id?: number;
  placeId: number;
  tableId: number;
  name?: string;
  stars?: number;
}
