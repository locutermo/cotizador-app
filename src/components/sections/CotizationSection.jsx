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
    const { adults, kids } = cotizationDetail


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



    return (
        <div className="p-2 grid grid-cols-2 gap-2">
            <div className="space-y-3">
                <QuoteForm detail={cotizationDetail} save={setCotizationDetail} />
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