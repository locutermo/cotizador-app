import { useParams } from "react-router-dom";
import Breadcrumb from "../components/commons/Breadcrumbs/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { reservationFoundSelector } from "../features/reservations/reservationSlice";
import QuoteForm from "../components/commons/QuoteForm";
import { clientOptionsSelector } from "../features/clients/clientSlice";
import { hotelOptionsSelector } from "../features/hotels/hotelSlice";
import { aerolineOptionsSelector } from "../features/aerolines/aerolineSlice";
import { useEffect, useState } from "react";
import { editReservation } from "../features/reservations/thunks";
import TablePrice from "../components/commons/TablePrice";
import { getNewPrices } from "../util/util";
export default function ReservationEdit() {
  let { reservationId } = useParams();
  const dispatch = useDispatch();
  const clientOptions = useSelector(clientOptionsSelector);
  const hotelOptions = useSelector(hotelOptionsSelector);
  const aerolineOptions = useSelector(aerolineOptionsSelector);
  const { destinations } = useSelector(state => state.destination)

  const selector = useSelector(reservationFoundSelector(reservationId));
  const [detail, setDetail] = useState({});
  const [aerolines, setAerolines] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [aerolinesSelected, setAerolinesSelected] = useState([]);
  const [hotelsSelected, setHotelsSelected] = useState([]);

  const { traslado, islaSaona, adults, kids, adultFee, kidFee, santoDomingo } =
    Object(selector?.cotizationDetail);
  const islaSaonaKid = islaSaona / 2;
  const santoDomingoKid = santoDomingo / 2;
  const trasladoKid = traslado;
  const aerolinePricesFiltered = aerolines
    ?.filter((e) => e.price)
    .map((aeroline) => aeroline.price);
  const minAerolinePrice =
    aerolinePricesFiltered?.length > 0 && Math.min(...aerolinePricesFiltered);
  const aerolinePriceByOne = Math.round(
    minAerolinePrice / ((kids | 0) + adults)
  );

  const totalOperativity = (
    minAerolinePrice,
    hotelPrice,
    traslado,
    islaSaona,
    santoDomingo
  ) => {
    return (
      (!isNaN(parseInt(minAerolinePrice)) ? parseInt(minAerolinePrice) : 0) +
      (!isNaN(parseInt(traslado)) ? parseInt(traslado) : 0) +
      (!isNaN(parseInt(islaSaona)) ? parseInt(islaSaona) : 0) +
      (!isNaN(parseInt(hotelPrice)) ? parseInt(hotelPrice) : 0) +
      (!isNaN(parseInt(santoDomingo)) ? parseInt(santoDomingo) : 0)
    );
  };

  useEffect(() => {
    if (selector) {
      setHotelsSelected(selector.hotelPrices.map(e => ({ value: e.id, label: e.name })))
      setAerolinesSelected(selector.aerolinePrices.map(e => ({ value: e.id, label: e.name })))
      setDetail(selector.cotizationDetail);
      setAerolines(selector.aerolinePrices);
      setHotels(selector.hotelPrices);
    }
  }, [selector, reservationId]);

  const matchOlderWithNewer = (olders, newers) => {
    const toAdd = [];
    const toUpdate = [];
    const toDelete = [];

    olders.forEach((older) => {
      const found = newers.find((e) => e.id === older.id);
      if (found && found.price > 0) {
        toUpdate.push({ ...found, table_id: older.table_id });
      } else toDelete.push(older);
    });

    newers
      .filter((e) => e.price > 0)
      .forEach((newer) => {
        const found = olders.find((e) => e.id === newer.id);
        if (!found) {
          toAdd.push(newer);
        }
      });

    return {
      toAdd,
      toUpdate,
      toDelete,
    };
  };

  return (
    <div>
      <Breadcrumb
        current={{ name: `Edición de reserva` }}
        previous={{ name: "Detalle", url: "reservations" }}
      />
      <div className="flex gap-4">
        <div className="flex flex-col gap-6 w-1/2">
          <QuoteForm
            setAerolinesSelected={e => { setAerolinesSelected(e) }}
            setHotelsSelected={e => { setHotelsSelected(e) }}
            hotelsSelected={hotelsSelected}
            aerolinesSelected={aerolinesSelected}
            destinations={destinations}
            detail={detail}
            optionsSelected={{
              hotels: selector?.hotelPrices,
              aerolines: selector?.aerolinePrices,
            }}
            clientOptions={clientOptions}
            aerolines={aerolineOptions}
            hotels={hotelOptions}
            save={(e) => {
              dispatch(
                editReservation({
                  id: reservationId,
                  cotizationDetail: detail,
                  aerolinePrices: matchOlderWithNewer(
                    selector?.aerolinePrices,
                    aerolines
                  ),
                  hotelPrices: matchOlderWithNewer(
                    selector?.hotelPrices,
                    hotels
                  ),
                })
              );
            }}
            updateOnAttribute={({ attribute, value }) => {
              setDetail((prev) => ({ ...prev, [attribute]: value }));
            }}
            onChangeAerolines={(newArray) => {
              setAerolines(getNewPrices(newArray, aerolineOptions, aerolines));
            }}
            onChangeHotels={(newArray) => {
              setHotels(getNewPrices(newArray, hotelOptions, hotels));
            }}
          />

          <TablePrice
            options={aerolines}
            detail={detail}
            type="aeroline"
            onUpdateOptions={(option) => {
              setAerolines((prev) =>
                prev.map((e) => (e.name === option.name ? option : e))
              );
            }}
          />
          <TablePrice
            options={hotels}
            detail={detail}
            type="hotel"
            onUpdateOptions={(option) => {
              setHotels((prev) =>
                prev.map((e) => (e.name === option.name ? option : e))
              );
            }}
          />
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          {hotels.length > 0 && (
            <table className="min-w-full rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
              <thead className="[&_th]:p-4  [&_th]:border-2 [&_th]:border-blue-300">
                <tr>
                  <th className="text-start">Hotel</th>
                  <th>Total Adulto</th>
                  {kids > 0 && <th>Total Niño</th>}
                </tr>
              </thead>
              <tbody className="text-center [&_td]:px-4 [&_td]:py-2">
                {[...hotels]
                  .sort((a, b) => a.price - b.price)
                  .map(({ name, priceByAdults, priceByKids }, index) => (
                    <tr key={index} className="[&_td]:border-2 [&_td]:border-blue-200">
                      <td className="text-start">{name}</td>
                      <td>
                        $
                        {totalOperativity(
                          aerolinePriceByOne,
                          priceByAdults,
                          traslado,
                          islaSaona,
                          santoDomingo
                        ) +
                          (adultFee || 0) * 1.18}
                      </td>
                      {kids > 0 && (
                        <td>
                          $
                          {totalOperativity(
                            aerolinePriceByOne,
                            priceByKids,
                            trasladoKid,
                            islaSaonaKid,
                            santoDomingoKid
                          ) +
                            (kidFee || 0) * 1.18}
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
          <div className="grid grid-cols-2 grid-rows-3 gap-4 ">


            {[...hotels]
              .sort((a, b) => a.price - b.price).map(({ name, priceByAdults, priceByKids }, index) => (
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
                      {traslado > 0 && (<td className="text-start">Traslado Compartido</td>)}
                      {traslado > 0 && (<td>${traslado}</td>)}
                      {kids > 0 && (<td>${trasladoKid}</td>)}

                    </tr>
                    <tr>
                      {islaSaona > 0 && (<td className="text-start">Isla Saona</td>)}
                      {islaSaona > 0 && (<td>${islaSaona}</td>)}
                      {kids > 0 && (<td>${islaSaonaKid}</td>)}
                    </tr>
                    <tr>
                      {santoDomingo > 0 && (<td className="text-start">Santo Domingo</td>)}
                      {santoDomingo > 0 && (<td>${santoDomingo}</td>)}
                      {(kids > 0 && santoDomingo > 0) && (<td>${santoDomingoKid}</td>)}
                    </tr>
                    <tr>
                      <td className="text-start">{name}</td>
                      <td>${priceByAdults}</td>
                      {kids > 0 && (<td>${priceByKids}</td>)}

                    </tr>
                    <tr>
                      <td className="text-start">Total operatividad</td>
                      <td>${totalOperativity(aerolinePriceByOne, priceByAdults, traslado, islaSaona, santoDomingo)}</td>
                      {kids > 0 && (<td>${totalOperativity(aerolinePriceByOne, priceByKids, trasladoKid, islaSaonaKid, santoDomingoKid)}</td>)}
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
                      <td></td>
                      <td>${totalOperativity(aerolinePriceByOne, priceByAdults, traslado, islaSaona, santoDomingo) + ((adultFee || 0) * 1.18)}</td>
                      {kids > 0 && (<td>${totalOperativity(aerolinePriceByOne, priceByKids, trasladoKid, islaSaonaKid, santoDomingoKid) + ((kidFee || 0) * 1.18)}</td>)}
                    </tr>
                  </tbody>
                </table>
              ))}
          </div>
        </div>



      </div>
    </div>
  );
}
