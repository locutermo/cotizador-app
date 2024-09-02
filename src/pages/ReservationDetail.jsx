import { useParams } from 'react-router-dom';
import Breadcrumb from "../components/commons/Breadcrumbs/Breadcrumb";
import { useSelector } from 'react-redux';
import { reservationFoundSelector } from '../features/reservations/reservationSlice';
export default function ReservationDetail() {
    let { id } = useParams();
    const { hotelPrices, aerolinePrices, ...data } = useSelector(reservationFoundSelector(id))
    const { islaSaona, santoDomingo } = data.tours
    const islaSaonaKid = islaSaona > 0 ? islaSaona / 2 : 0
    const santoDomingoKid = santoDomingo > 0 ? santoDomingo / 2 : 0
    const { kids, adults, days, relocation, startDate, endDate, customer, customer_id, places_id, fee_kids, fee_adults } = data
    const aerolinePricesFiltered = aerolinePrices.filter(e => e.price).map(aeroline => aeroline.price)
    const minAerolinePrice = aerolinePricesFiltered.length > 0 && Math.min(...aerolinePricesFiltered)
    const aerolinePriceByOne = Math.round(minAerolinePrice / ((kids | 0) + adults))

    const totalOperativity = (minAerolinePrice, hotelPrice, traslado, islaSaona, santoDomingo) => {
        return (
            (!isNaN(parseInt(minAerolinePrice)) ? parseInt(minAerolinePrice) : 0) +
            (!isNaN(parseInt(traslado)) ? parseInt(traslado) : 0) +
            (!isNaN(parseInt(islaSaona)) ? parseInt(islaSaona) : 0) +
            (!isNaN(parseInt(hotelPrice)) ? parseInt(hotelPrice) : 0) +
            (!isNaN(parseInt(santoDomingo)) ? parseInt(santoDomingo) : 0)
        )
    }


    return <div>
        <Breadcrumb current={{ name: 'Reservas' }} previous={{ name: "Detalle", url: 'reservations' }} />
        <div className="flex gap-6">

            <div>
                <table className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
                    <thead className="[&_th]:p-4  [&_th]:border-2 [&_th]:border-blue-300">
                        <th className="text-start" >Dato</th>
                        <th>Valor</th>
                    </thead>
                    <tbody className="text-center [&_td]:px-4 [&_td]:py-2">
                        <tr className="[&_td]:border-2 [&_td]:border-blue-200">
                            <td className="text-start">ID</td>
                            <td className="text-center">{data.id}</td>
                        </tr>
                        <tr className="[&_td]:border-2 [&_td]:border-blue-200">
                            <td className="text-start">Cliente</td>
                            <td className="text-center">{customer}</td>
                        </tr>
                        <tr className="[&_td]:border-2 [&_td]:border-blue-200">
                            <td className="text-start">FEE Adulto</td>
                            <td className="text-center">{fee_adults}</td>
                        </tr>
                        <tr className="[&_td]:border-2 [&_td]:border-blue-200">
                            <td className="text-start">FEE Niño</td>
                            <td className="text-center">{fee_kids}</td>
                        </tr>
                        <tr className="[&_td]:border-2 [&_td]:border-blue-200">
                            <td className="text-start">Fecha de salida</td>
                            <td className="text-center">{startDate}</td>
                        </tr>
                        <tr className="[&_td]:border-2 [&_td]:border-blue-200">
                            <td className="text-start"># Dias</td>
                            <td className="text-center">{days}</td>
                        </tr>
                        <tr className="[&_td]:border-2 [&_td]:border-blue-200">
                            <td className="text-start"># Adultos</td>
                            <td className="text-center">{adults}</td>
                        </tr>
                        <tr className="[&_td]:border-2 [&_td]:border-blue-200">
                            <td className="text-start"># Niños</td>
                            <td className="text-center">{kids}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <div>
                {hotelPrices.length > 0 && (
                    <table className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
                        <thead className="[&_th]:p-4  [&_th]:border-2 [&_th]:border-blue-300">
                            <th className="text-start" >Hotel</th>
                            <th>Total Adulto</th>
                            {kids > 0 && (<th>Total Niño</th>)}
                        </thead>
                        <tbody className="text-center [&_td]:px-4 [&_td]:py-2">
                            {hotelPrices.map(({ hotels, adult_price, kid_price }, index) => (
                                <tr className="[&_td]:border-2 [&_td]:border-blue-200">
                                    <td className="text-start">{hotels.name}</td>
                                    <td>${totalOperativity(aerolinePriceByOne, adult_price, relocation, islaSaona, santoDomingo) + ((fee_adults || 0) * 1.18)}</td>
                                    {kids > 0 && (<td>${totalOperativity(aerolinePriceByOne, kid_price, relocation, islaSaonaKid, santoDomingoKid) + ((fee_kids || 0) * 1.18)}</td>)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>




        <br></br>
        {hotelPrices.map(hotelPrice => (
            <div>
                <p>Hotel: {hotelPrice.hotels.name} - ${hotelPrice.price} en total | ${hotelPrice.adult_price} por adulto | ${hotelPrice.kid_price || 0} por niño</p>
            </div>
        ))}
        <br></br>

        {aerolinePrices.map(aerolinePrice => (
            <div>
                <p>Hotel: {aerolinePrice.aerolines.name} - ${aerolinePrice.price} en total | ${aerolinePrice.adult_price} por adulto | ${aerolinePrice.kid_price || 0} por niño</p>
            </div>
        ))}

        <br></br>



    </div>
}