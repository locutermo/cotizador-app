import { useEffect } from "react"
import { useSelector } from "react-redux";
export default function DetailSection() {


    const {cotizationDetail,hotelPrices,aerolinePrices} = useSelector(state => state.cotization);
    const hotels = hotelPrices.filter( e => e.price)
    const {traslado,islaSaona,adults,kids,adultFee,kidFee,santoDomingo} = cotizationDetail
    const islaSaonaKid = islaSaona/2
    const santoDomingoKid = santoDomingo/2
    const trasladoKid = traslado/2
    const aerolinePricesFiltered = aerolinePrices.filter(e => e.price).map(aeroline => aeroline.price)
    const minAerolinePrice = aerolinePricesFiltered.length > 0 && Math.min(...aerolinePricesFiltered)
    const aerolinePriceByOne = Math.round(minAerolinePrice/((kids|0)+adults))
    
    useEffect(() => {

    }, [cotizationDetail])

    //Refactorizar: Enviar por parametro un objeto y Usar map reduce e iterar sobre el objeto para sumar y aplicar lo mismo para todos los casos
    const totalOperativity=(minAerolinePrice,hotelPrice,traslado,islaSaona,santoDomingo)=>{
        return (
            (!isNaN(parseInt(minAerolinePrice))?parseInt(minAerolinePrice):0)+
            (!isNaN(parseInt(traslado))?parseInt(traslado):0)+
            (!isNaN(parseInt(islaSaona))?parseInt(islaSaona):0)+
            (!isNaN(parseInt(hotelPrice))?parseInt(hotelPrice):0)+
            (!isNaN(parseInt(santoDomingo))?parseInt(santoDomingo):0)
        )
    }

    return (
        <div className="grid grid-cols-2 grid-rows-3 gap-2">
            {hotels.sort( (a,b) => a.priceByAdults - b.priceByAdults).map(({name,priceByAdults,priceByKids},index) => (
                    <table key={index} className="min-w-full border-2 bg-white shadow-lg border-slate-100">
                    <thead className="[&_th]:p-4 ">
                        <th className="text-start" >Servicio</th>
                        <th>1 Adulto</th>
                        {kids>0 && (<th>1 Niño</th>)}
                    </thead>
                    <tbody className="text-center [&_td]:py-2 [&_td]:px-4 ">
                        <tr>
                            <td className="text-start">Boleto Aereo</td>
                            <td>${aerolinePriceByOne}</td>
                            {kids>0 && (<td>${aerolinePriceByOne}</td>)}
                            
                        </tr>
                        <tr>
                            {traslado>0 && (<td className="text-start">Traslado Compartido</td>)}
                            {traslado>0&&(<td>${traslado}</td>)}
                            {kids>0 && (<td>${trasladoKid}</td>)}
                            
                        </tr>
                        <tr>
                            {islaSaona>0 && (<td className="text-start">Isla Saona</td>)}
                            {islaSaona>0 && (<td>${islaSaona}</td>)}
                            {kids>0 && (<td>${islaSaonaKid}</td>)}
                        </tr>
                        <tr>
                            {santoDomingo>0 && (<td className="text-start">Santo Domingo</td>)}
                            {santoDomingo>0 && (<td>${santoDomingo}</td>)}
                            {(kids>0 && santoDomingo > 0)&& (<td>${santoDomingoKid}</td>)}
                        </tr>
                        <tr>
                            <td className="text-start">{name}</td>
                            <td>${priceByAdults}</td>
                            {kids>0 && (<td>${priceByKids}</td>)}
                            
                        </tr>
                        <tr>
                            <td className="text-start">Total operatividad</td>
                            <td>${totalOperativity(aerolinePriceByOne,priceByAdults,traslado,islaSaona,santoDomingo)}</td>
                            {kids>0 && (<td>${totalOperativity(aerolinePriceByOne,priceByKids,trasladoKid,islaSaonaKid,santoDomingoKid)}</td>)}
                        </tr>
                        <tr>
                            {(adultFee > 0 || kidFee) && (<td className="text-start">Fee</td>)}
                            {<td>${adultFee||0}</td>}
                            {kids>0 && (<td>${kidFee}</td>)}
                        </tr>
                        <tr>
                            {(adultFee > 0 || kidFee) && (<td className="text-start">IGV (Sobre Fee)</td>)}
                            {<td>${((adultFee||0)*0.18).toFixed(2)}</td>}
                            {kids>0 && (<td>${(kidFee*0.18).toFixed(2)}</td>)}
                        </tr>
                        <tr className="[&_td]:text-blue-800 [&_td]:font-semibold">
                            <td></td>
                            <td>${totalOperativity(aerolinePriceByOne,priceByAdults,traslado,islaSaona,santoDomingo)+((adultFee||0)*1.18)}</td>
                            {kids>0 && (<td>${totalOperativity(aerolinePriceByOne,priceByKids,trasladoKid,islaSaonaKid,santoDomingoKid) + ((kidFee||0)*1.18)}</td>)}
                        </tr>
                    </tbody>
                </table>
            ))}
        </div>

    )
}