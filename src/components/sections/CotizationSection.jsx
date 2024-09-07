'use client'
import { useEffect } from "react";
import QuoteForm from "../commons/QuoteForm";
import TablePrice from "../commons/TablePrice";
import { AEROLINES, HOTELS } from "../../util/constants";
import { useSelector, useDispatch } from 'react-redux'
import {
    clean,
    setAerolinePrices,
    setHotelPrices,
    updateAerolineOption,
    updateHotelOption,
    updateOnAttributeDetail
} from '../../features/cotization/cotizationSlice'

import { createReservationWithAerolinesAndHotels } from "../../features/reservations/thunks";
import { clientOptionsSelector } from "../../features/clients/clientSlice";
import { hotelOptionsSelector } from "../../features/hotels/hotelSlice";
import { aerolineOptionsSelector } from "../../features/aerolines/aerolineSlice";
import { getNewPrices } from "../../util/util";

export default function CotizationSection() {
    const { cotizationDetail, aerolinePrices, hotelPrices } = useSelector(state => state.cotization)
    const clientOptions = useSelector(clientOptionsSelector)
    const hotelOptions = useSelector(hotelOptionsSelector)
    const aerolineOptions = useSelector(aerolineOptionsSelector)
    const dispatch = useDispatch()


    useEffect(() => {

    }, [cotizationDetail])


    return (
        <div className="flex flex-col gap-4 ">
            <QuoteForm
                save={e => {
                    dispatch(createReservationWithAerolinesAndHotels({ cotizationDetail, aerolinePrices, hotelPrices }));
                    dispatch(clean())
                }}
                detail={cotizationDetail}
                clientOptions={clientOptions}
                aerolines={aerolineOptions}
                hotels={hotelOptions}
                updateOnAttribute={({ attribute, value }) => dispatch(updateOnAttributeDetail({ attribute, value }))}
                onChangeAerolines={newArray => { dispatch(setAerolinePrices(getNewPrices(newArray, aerolineOptions, aerolinePrices))) }}
                onChangeHotels={newArray => { dispatch(setHotelPrices(getNewPrices(newArray, hotelOptions, hotelPrices))) }}

            />

            <TablePrice options={aerolinePrices} detail={cotizationDetail} type="aeroline" onUpdateOptions={option => { dispatch(updateAerolineOption(option)) }} />
            <TablePrice options={hotelPrices} detail={cotizationDetail} type="hotel" onUpdateOptions={option => { dispatch(updateHotelOption(option)) }} />
        </div>
    )
}