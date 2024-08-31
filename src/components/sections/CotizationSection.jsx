'use client'
import { useEffect, useState } from "react";
import QuoteForm from "../commons/QuoteForm";
import TablePrice from "../commons/TablePrice";
import { AEROLINES, HOTELS } from "../../util/constants";
import { useSelector, useDispatch } from 'react-redux'
import { 
    setCotizationDetail, 
    setAerolinePrices, 
    setHotelPrices,
    updateAerolineOption,
    updateHotelOption,
    updateOnAttributeDetail
} from '../../features/cotization/cotizationSlice'
export default function CotizationSection() {
    const { cotizationDetail, aerolinePrices, hotelPrices } = useSelector(state => state.cotization)
    const dispatch = useDispatch()


    useEffect(() => {

    }, [cotizationDetail])

    const onChangeSelector = (newArray, name) => {


        if (name == "aeroline") {
            const setSelected = new Set(newArray);
            const setPrevious = new Set(aerolinePrices.map(e => e.name))

            const intersection = new Set([...setSelected].filter(x => setPrevious.has(x)))
            let newAerolines = aerolinePrices.filter(aeroline => [...intersection].find(e => e == aeroline.name))


            const difference = new Set([...setSelected].filter(x => !setPrevious.has(x)))
            if ([...difference].length > 0) {
                newAerolines.push(...[...difference].map(e => ({ name: e })))
            }

            dispatch(setAerolinePrices(newAerolines))
        }
        if (name == "hotel") {
            const setSelected = new Set(newArray);
            const setPrevious = new Set(hotelPrices.map(e => e.name))

            const intersection = new Set([...setSelected].filter(x => setPrevious.has(x)))
            let newHotels = hotelPrices?.filter(aeroline => [...intersection].find(e => e == aeroline.name))


            const difference = new Set([...setSelected].filter(x => !setPrevious.has(x)))
            if ([...difference].length > 0) {
                newHotels.push(...[...difference].map(e => ({ name: e })))
            }

            dispatch(setHotelPrices(newHotels))
        }
    }

    return (
        <div className="flex flex-col gap-4 ">

            <QuoteForm
                detail={cotizationDetail}
                aerolines={AEROLINES.map(e => e.name)}
                hotels={HOTELS.map(e => e.name)}
                onChangeAerolines={e => { onChangeSelector(e, 'aeroline') }}
                onChangeHotels={e => { onChangeSelector(e, 'hotel') }}
                updateOnAttribute={({attribute,value}) => dispatch(updateOnAttributeDetail({attribute,value}))}
            />
            <TablePrice options={aerolinePrices} detail={cotizationDetail} type="aeroline" onUpdateOptions={option => { dispatch(updateAerolineOption(option)) }} />
            <TablePrice options={hotelPrices} detail={cotizationDetail} type="hotel" onUpdateOptions={option => { dispatch(updateHotelOption(option)) }} />
        </div>
    )
}