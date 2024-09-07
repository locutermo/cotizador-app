interface CotizationDetail {
    adults: number,
    days: number,
    kids: number,
    adultFee: number,
    kidFee: number,
    traslado: number,
    islaSaona: number,
    santoDomingo: number
    customer: number,
    startDate?: string,
    endDate?: string,
    place?: string,
    created_at?: string,
    places_id: number,
    customerName?: string,
}

interface AerolinePrice {
    id: number,
    priceByAdults: number,
    priceByKids: number
}

interface AerolinePriceTable {
    id: number,
    price:number
    kid_price: number,
    adult_price: number
    aerolines: {
        name: string,
        id: number
    }
}

interface AerolinePriceObject {
    table_id: number,
    name: string
    price:number,
    priceByAdults: number,
    priceByKids: number
    id?: number,
}

/**
 * Datos del Hotel Price que llega desde la BD
 */
interface HotelPriceTable {
    id: number,
    kid_price: number,
    adult_price: number,
    price:number,
    hotels: {
        name: string
        id: number
    }
}
/**
 * Datos del Hotel Price que se usa en la app
 */
interface HotelPriceObject {
    price:number,
    id: number
    name: string
    table_id: number,
    priceByAdults: number,
    priceByKids: number

}

interface CotizationWithPrice {
    id: string,
    cotizationDetail: CotizationDetail,
    aerolinePrices: AerolinePriceObject[],
    hotelPrices: HotelPriceObject[],

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
    },
    customer_id: Number;
    places_id: Number;
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
    id: string,
    customer_id: number,
    places_id: number,
    places: {
        name: string
    },
    reservations_hotels: HotelPriceTable[],
    reservations_aerolines: AerolinePriceTable[],
    start_date: string,
    end_date: string,
    fee_adults: number,
    days: number,
    fee_kids: number,
    clients: {
        name: string,
    },
    kids: number,
    adults: number,
    relocation: number,
    tours: {
        islaSaona: number,
        santoDomingo: number
    }

}