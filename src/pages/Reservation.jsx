import Breadcrumb from "../components/commons/Breadcrumbs/Breadcrumb";
import Table from "../components/commons/Table/Table";
import { useSelector } from "react-redux";

export default function Reservation() {
  const { reservations } = useSelector(state => state.reservation)



  
  const headers = [
    {
      attribute: 'created_at',
      title: 'Fecha cotizado',
      type: 'text',
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
      type: 'datetime'
    },
    {
      attribute: 'days',
      title: "Cantidad de días",
      type: 'number'
    },
    {
      attribute: 'endDate',
      title: "Fecha de retorno",
      type: 'datetime'
    },
  ]

  return (
    <>
      <Breadcrumb pageName="Reservas" homeName='Inicio' />
      <Table data={reservations} headers={headers} />
    </>
  )
}