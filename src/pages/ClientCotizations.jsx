import { useParams } from 'react-router-dom';
import Breadcrumb from "../components/commons/Breadcrumbs/Breadcrumb";

export default function ClientCotizations() {
    let { id } = useParams();

    return <div>
        <Breadcrumb current={{name:'Cotizaciones'}} previous={{name:"Clientes",url:'customers'}} />

        <h1>Cotizaciones del cliente {id}</h1>
    </div>
}