export default function CotizationDetail({days,startDate,adults,kids}){

    return (
        <div className="bg-orange-200 flex flex-col">
            <span>Cantidad de dias: {days}</span>
            <span>Cantidad de noches: {days>0?days-1:days}</span>
            <span>Fecha de inicio: {startDate}</span>
            <span>Cantidad de adulros: {adults}</span>
            <span>Cantidad de niños: {kids}</span>
            
        </div>
    )
}