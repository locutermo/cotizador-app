import Breadcrumb from "../components/commons/Breadcrumbs/Breadcrumb";
import Table from "../components/commons/Table/Table";
import { useSelector } from "react-redux";

export default function Reservation() {
  const data = []

  const formatData = (data) => {
    return data.map(element => ({
      ...element,
      reservations: element.reservations[0].count
    }))
  }
  const headers = [
    {
      attribute: 'name',
      title: 'Nombre',
      type: 'text',
    },
    {
      attribute: 'created_at',
      type: 'datetime',
      title: 'Creado'
    },
    {
      attribute: 'reservations',
      title: "Cantidad de cotizaciones",
      type: 'number'
    },
  ]

  return (
    <>
      <Breadcrumb pageName="Reservas" homeName='Inicio' />
      <Table data={formatData(data)} headers={headers} />
    </>
  )
}