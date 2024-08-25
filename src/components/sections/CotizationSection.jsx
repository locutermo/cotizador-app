import { useEffect, useState } from "react";
import CotizationDetail from "../commons/CotizationDetail";
import QuoteForm from "../commons/QuoteForm";
import TablePrice from "../commons/TablePrice";
import { AEROLINES, HOTELS, ISLA_SAONA, TRASLADO_PRICE } from "../../util/constants";
import TableDetail from "../commons/DetailSection";
import DetailSection from "../commons/DetailSection";

export default function CotizationSection() {

    const [cotizationDetail, setCotizationDetail] = useState({ adults: 1, days: 1, kids: 0, adultFee: 100, kidFee: 100, traslado: TRASLADO_PRICE,islaSaona:ISLA_SAONA });
    const [aerolinePrices, setAerolinePrices] = useState(AEROLINES)
    const [hotelPrices, setHotelPrices] = useState(HOTELS)


    const onUpdateOptions = (option, dispatch) => {

        dispatch(prevValue => prevValue.map(prevOptionPrice => {
            if (prevOptionPrice.name === option.name) return option
            return prevOptionPrice
        }))
    }

    const aerolinePricesFiltered = aerolinePrices.filter(e => e.price).map(aeroline => aeroline.price)
    const minAerolinePrice = aerolinePricesFiltered.length > 0 && Math.min(...aerolinePricesFiltered)

    useEffect(() => {

    }, [cotizationDetail])

    const onChangeSelector=(newArray,name)=>{



        if(name=="aeroline"){
            const setSelected = new Set(newArray);
            const setPrevious = new Set(aerolinePrices.map(e => e.name))

            const intersection = new Set([...setSelected].filter(x => setPrevious.has(x)))
            let newAerolines = aerolinePrices.filter(aeroline => [...intersection].find(e => e ==aeroline.name))


            const difference = new Set([...setSelected].filter(x => !setPrevious.has(x)))
            if([...difference].length > 0){
                newAerolines.push(...[...difference].map(e => ({name: e})))
            }

            setAerolinePrices(newAerolines)
        }
        if(name=="hotel"){
            const setSelected = new Set(newArray);
            const setPrevious = new Set(hotelPrices.map(e => e.name))

            const intersection = new Set([...setSelected].filter(x => setPrevious.has(x)))
            let newHotels = hotelPrices.filter(aeroline => [...intersection].find(e => e ==aeroline.name))


            const difference = new Set([...setSelected].filter(x => !setPrevious.has(x)))
            if([...difference].length > 0){
                newHotels.push(...[...difference].map(e => ({name: e})))
            }

            setHotelPrices(newHotels)
        }
    }

    return (
        <div className="p-2 grid grid-cols-2 gap-2">
            <div className="space-y-3">
                <QuoteForm 
                    detail={cotizationDetail} 
                    aerolines={AEROLINES.map(e => e.name)}
                    hotels={HOTELS.map(e => e.name)}
                    onChangeAerolines={e => {onChangeSelector(e,'aeroline')}} 
                    onChangeHotels={e => {onChangeSelector(e,'hotel')}} 
                    save={setCotizationDetail} 
                />
                <TablePrice options={aerolinePrices} detail={cotizationDetail} type="aeroline" onUpdateOptions={option => { onUpdateOptions(option, setAerolinePrices) }} />
                <TablePrice options={hotelPrices} detail={cotizationDetail} type="hotel" onUpdateOptions={option => { onUpdateOptions(option, setHotelPrices) }} />
            </div>
            <div>
                <DetailSection
                    cotizationDetail={cotizationDetail}
                    hotels={hotelPrices.filter(e => e.price)}
                    aerolinePrice={minAerolinePrice}
                />
            </div>
        </div>
    )
}