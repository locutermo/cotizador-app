import { useEffect } from "react"
import { useSelector } from "react-redux";
import { convertTourFormat, getTotalPriceByHotels, totalOperativity } from "../../util/util";
import TableFinalPrice from "../commons/TableFinalPrice";
import PriceCard from "../commons/PriceCard";
export default function DetailSection() {


    const { cotizationDetail, hotelPrices, aerolinePrices } = useSelector(state => state.cotization);
    const hotels = hotelPrices.filter(e => e.price)
    const { traslado, adults, kids, adultFee, kidFee, tours } = cotizationDetail
    const trasladoKid = traslado
    const aerolinePricesFiltered = aerolinePrices.filter(e => e.price).map(aeroline => aeroline.price)
    const minAerolinePrice = aerolinePricesFiltered.length > 0 && Math.min(...aerolinePricesFiltered)
    const aerolinePriceByOne = Math.round(minAerolinePrice / ((kids | 0) + adults))

    useEffect(() => {

    }, [cotizationDetail])

    const toursConverted = convertTourFormat(tours)

    const totalPriceByHotels = getTotalPriceByHotels([...hotels].sort((a, b) => a.price - b.price), aerolinePriceByOne, traslado, trasladoKid, toursConverted, adultFee, kidFee)


    return (
        <div className="flex flex-col gap-6">
            <TableFinalPrice
                kids={kids}
                rows={totalPriceByHotels}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-3 gap-4 ">
                {totalPriceByHotels.map((e) => <PriceCard kids={kids} services={e.services} />)}
            </div>



        </div>

    )
}