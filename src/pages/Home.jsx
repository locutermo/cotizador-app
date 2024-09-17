import { useSelector } from "react-redux"
export default function Home() {
    const { clients, cotizationDetail, aerolinePrices, hotelPrices, clientStatus,clientError } = useSelector(state => state.cotization)
    return <div className="w-full min-h-lvh">
    </div>
}