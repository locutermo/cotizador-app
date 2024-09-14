import { useEffect } from "react"
import { useSelector } from "react-redux";
import { convertTourFormat, totalOperativity } from "../../util/util";
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
    const tourAdultPrices = toursConverted.reduce((acc, tour) => tour.adultPrice + acc, 0)
    const tourKidPrices = toursConverted.reduce((acc, tour) => tour.kidPrice + acc, 0)

    return (
        <div className="flex flex-col gap-6">
            {hotels.length > 0 && (
                <table className="min-w-full rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
                    <thead className="[&_th]:p-4  [&_th]:border-2 [&_th]:border-blue-300">
                        <th className="text-start" >Hotel</th>
                        <th>Total Adulto</th>
                        {kids > 0 && (<th>Total Niño</th>)}
                    </thead>
                    <tbody className="text-center [&_td]:px-4 [&_td]:py-2">
                        {hotels.sort((a, b) => a.priceByAdults - b.priceByAdults).map(({ name, priceByAdults, priceByKids }, index) => (
                            <tr className="[&_td]:border-2 [&_td]:border-blue-200">
                                <td className="text-start">{name}</td>
                                <td>${totalOperativity(aerolinePriceByOne, priceByAdults, traslado, tourAdultPrices) + ((adultFee || 0) * 1.18)}</td>
                                {kids > 0 && (<td>${totalOperativity(aerolinePriceByOne, priceByKids, trasladoKid, tourKidPrices) + ((kidFee || 0) * 1.18)}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div className="grid grid-cols-2 grid-rows-3 gap-4 ">
                {hotels.sort((a, b) => a.priceByAdults - b.priceByAdults).map(({ name, priceByAdults, priceByKids }, index) => (
                    <table key={index} className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 ">
                        <thead className="[&_th]:p-4 ">
                            <th className="text-start" >Servicio</th>
                            <th>1 Adulto</th>
                            {kids > 0 && (<th>1 Niño</th>)}
                        </thead>
                        <tbody className="text-center [&_td]:py-2 [&_td]:px-4 ">
                            <tr>
                                <td className="text-start">Boleto Aereo</td>
                                <td>${aerolinePriceByOne}</td>
                                {kids > 0 && (<td>${aerolinePriceByOne}</td>)}

                            </tr>
                            <tr>
                                <td className="text-start">{name}</td>
                                <td>${priceByAdults}</td>
                                {kids > 0 && (<td>${priceByKids}</td>)}

                            </tr>
                            <tr>
                                {traslado > 0 && (<td className="text-start">Traslado Compartido</td>)}
                                {traslado > 0 && (<td>${traslado}</td>)}
                                {kids > 0 && (<td>${trasladoKid}</td>)}

                            </tr>
                            {
                                toursConverted.map(tour => (
                                    <tr>
                                        <td className="text-start">{tour.name}</td>
                                        {tour.adultPrice > 0 && (<td>${tour.adultPrice}</td>)}
                                        {kids > 0 && (<td>${tour.kidPrice}</td>)}
                                    </tr>
                                ))
                            }
                            <tr className="[&_td]:text-red-800 [&_td]:font-semibold">
                                <td className="text-start">Sub total</td>
                                <td>${totalOperativity(aerolinePriceByOne, priceByAdults, traslado, tourAdultPrices)}</td>
                                {kids > 0 && (<td>${totalOperativity(aerolinePriceByOne, priceByKids, trasladoKid, tourKidPrices)}</td>)}
                            </tr>
                            <tr>
                                {(adultFee > 0 || kidFee) && (<td className="text-start">Fee</td>)}
                                {<td>${adultFee || 0}</td>}
                                {kids > 0 && (<td>${kidFee}</td>)}
                            </tr>
                            <tr>
                                {(adultFee > 0 || kidFee) && (<td className="text-start">IGV (Sobre Fee)</td>)}
                                {<td>${((adultFee || 0) * 0.18).toFixed(2)}</td>}
                                {kids > 0 && (<td>${(kidFee * 0.18).toFixed(2)}</td>)}
                            </tr>
                            <tr className="[&_td]:text-blue-800 dark:[&_td]:text-yellow-400 [&_td]:font-semibold">
                                <td className="text-start">Total</td>
                                <td>${totalOperativity(aerolinePriceByOne, priceByAdults, traslado, tourAdultPrices) + ((adultFee || 0) * 1.18)}</td>
                                {kids > 0 && (<td>${totalOperativity(aerolinePriceByOne, priceByKids, trasladoKid, tourKidPrices) + ((kidFee || 0) * 1.18)}</td>)}
                            </tr>
                        </tbody>
                    </table>
                ))}
            </div>



        </div>

    )
}