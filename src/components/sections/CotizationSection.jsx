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

export default function CotizationSection() {
    const { cotizationDetail, aerolinePrices, hotelPrices } = useSelector(state => state.cotization)
    const clientOptions = useSelector(clientOptionsSelector)
    const hotelOptions = useSelector(hotelOptionsSelector)
    const aerolineOptions = useSelector(aerolineOptionsSelector)
    const dispatch = useDispatch()


    useEffect(() => {

    }, [cotizationDetail])

    const onChangeSelector = (newArray, name) => {
        const newArrayWithName = newArray.map(e => e.label)
        if (name === "aeroline") {
            const setSelected = new Set(newArrayWithName);
            const setPrevious = new Set(aerolinePrices.map(e => e.name))

            const intersection = new Set([...setSelected].filter(x => setPrevious.has(x)))
            let newAerolines = aerolinePrices.filter(aeroline => [...intersection].find(e => e === aeroline.name))


            const difference = new Set([...setSelected].filter(x => !setPrevious.has(x)))
            let differenceArray = Array.from(difference);
            differenceArray = differenceArray.map(e => {
                return aerolineOptions.find(aeroline => aeroline.label === e)
            })


            if ([...differenceArray].length > 0) {
                newAerolines.push(...[...differenceArray].map(e => ({ name: e.label,id:e.value })))
            }

            dispatch(setAerolinePrices(newAerolines))
        }
        if (name === "hotel") {
            const setSelected = new Set(newArrayWithName);
            const setPrevious = new Set(hotelPrices.map(e => e.name))

            const intersection = new Set([...setSelected].filter(x => setPrevious.has(x)))
            let newHotels = hotelPrices?.filter(aeroline => [...intersection].find(e => e === aeroline.name))

            const difference = new Set([...setSelected].filter(x => !setPrevious.has(x)))

            let differenceArray = Array.from(difference);
            differenceArray = differenceArray.map(e => {
                return hotelOptions.find(hotel => hotel.label === e)
            })

            if ([...differenceArray].length > 0) {
                newHotels.push(...[...differenceArray].map(e => ({ name: e.label,id:e.value })))
            }

            dispatch(setHotelPrices(newHotels))
        }
    }

    return (
        <div className="flex flex-col gap-4 ">

            <QuoteForm
                clientOptions={clientOptions}
                save={e => {
                    dispatch(createReservationWithAerolinesAndHotels({cotizationDetail,aerolinePrices,hotelPrices}));
                    dispatch(clean())

                }}
                detail={cotizationDetail}
                aerolines={aerolineOptions}
                hotels={hotelOptions}
                onChangeAerolines={e => { onChangeSelector(e, 'aeroline') }}
                onChangeHotels={e => { onChangeSelector(e, 'hotel') }}
                updateOnAttribute={({attribute,value}) => dispatch(updateOnAttributeDetail({attribute,value}))}
            />
            <TablePrice options={aerolinePrices} detail={cotizationDetail} type="aeroline" onUpdateOptions={option => { dispatch(updateAerolineOption(option)) }} />
            <TablePrice options={hotelPrices} detail={cotizationDetail} type="hotel" onUpdateOptions={option => { dispatch(updateHotelOption(option)) }} />
        </div>
    )
}