import { useSelector } from "react-redux"
export default function Home() {
    const { clients, cotizationDetail, aerolinePrices, hotelPrices, clientStatus,clientError } = useSelector(state => state.cotization)
    return <div className="w-full min-h-lvh">
        {clientStatus}
        {JSON.stringify(clientError)}
        <br></br>
        {clientStatus === 'loading' ? 'Cargando' : <h1>Clientes: {JSON.stringify(clients)}</h1>}
        <br></br>
        <p>Cotizacion: {JSON.stringify(cotizationDetail)}</p>
        <br></br>
        <p>Aerolineas: {JSON.stringify(aerolinePrices)}</p>
        <br></br>
        <p>Hoteles: {JSON.stringify(hotelPrices)}</p>
    </div>
}