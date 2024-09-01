import Breadcrumb from "../components/commons/Breadcrumbs/Breadcrumb";
import Table from "../components/commons/Table/Table";
import { useSelector } from "react-redux";
import { reservationsOrdered } from "../features/reservations/reservationSlice";
export default function Reservation() {
  const reservations = useSelector(reservationsOrdered)



  
  const headers = [
    {
      attribute: 'created_at',
      title: 'Fecha cotizado',
      type: 'datetime',
    },
    {
      attribute: 'customer',
      title: 'Cliente',
      type: 'text',
    },
    {
      attribute: 'place',
      title: 'Destino',
      type: 'text'
    },
    {
      attribute: 'startDate',
      title: "Fecha de salida",
      type: 'date'
    },
    {
      attribute: 'days',
      title: "Cantidad de días",
      type: 'number'
    },
    {
      attribute: 'endDate',
      title: "Fecha de retorno",
      type: 'date'
    },
  ]

  return (
    <>
      <Breadcrumb pageName="Reservas" homeName='Inicio' />
      <Table data={reservations} headers={headers} />
    </>
  )
}