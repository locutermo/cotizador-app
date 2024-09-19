import { useParams } from "react-router-dom";
import Breadcrumb from "../components/commons/Breadcrumbs/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { reservationFoundSelector } from "../features/reservations/reservationSlice";
import QuoteForm from "../components/commons/QuoteForm";
import { clientOptionsSelector } from "../features/clients/clientSlice";
import { hotelOptionsSelector } from "../features/hotels/hotelSlice";
import { aerolineOptionsSelector } from "../features/aerolines/aerolineSlice";
import { useEffect, useMemo, useState } from "react";
import { editReservation } from "../features/reservations/thunks";
import TablePrice from "../components/commons/TablePrice";
import {
  convertTourFormat,
  getNewPrices,
  getTotalPriceByHotels,
} from "../util/util";
import { keyboardImplementationWrapper } from "@testing-library/user-event/dist/keyboard";
import TableFinalPrice from "../components/commons/TableFinalPrice";
import PriceCard from "../components/commons/PriceCard";
export default function ReservationEdit() {
  let { reservationId } = useParams();
  const dispatch = useDispatch();
  const { tours } = useSelector((state) => state.tour);
  const clientOptions = useSelector(clientOptionsSelector);
  const hotelOptions = useSelector(hotelOptionsSelector);
  const aerolineOptions = useSelector(aerolineOptionsSelector);
  const { destinations } = useSelector((state) => state.destination);

  const selector = useSelector(reservationFoundSelector(reservationId));
  const [detail, setDetail] = useState({});
  const [aerolines, setAerolines] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [aerolinesSelected, setAerolinesSelected] = useState([]);
  const [hotelsSelected, setHotelsSelected] = useState([]);

  const { traslado, adults, kids, adultFee, kidFee } = Object(detail);

  const trasladoKid = traslado;
  const aerolinePricesFiltered = aerolines
    ?.filter((e) => e.price)
    .map((aeroline) => aeroline.price);
  const minAerolinePrice =
    aerolinePricesFiltered?.length > 0 && Math.min(...aerolinePricesFiltered);
  const aerolinePriceByOne = Math.round(
    minAerolinePrice / ((kids | 0) + adults)
  );

  useEffect(() => {
    if (selector) {
      setHotelsSelected(
        selector.hotelPrices.map((e) => ({ value: e.id, label: e.name }))
      );
      setAerolinesSelected(
        selector.aerolinePrices.map((e) => ({ value: e.id, label: e.name }))
      );
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

  const toursConverted = convertTourFormat(detail?.tours || []);
 
  const totalPriceByHotels = getTotalPriceByHotels([...hotels].sort((a, b) => a.price - b.price), aerolinePriceByOne, traslado, trasladoKid, toursConverted, adultFee, kidFee)

  return (
    <div>
      <Breadcrumb
        current={{ name: `Edición de reserva` }}
        previous={{ name: "Detalle", url: "reservations" }}
      />

      <div className="flex gap-4">
        <div className="flex flex-col gap-6 w-1/2">
          <QuoteForm
            setAerolinesSelected={(e) => {
              setAerolinesSelected(e);
            }}
            setHotelsSelected={(e) => {
              setHotelsSelected(e);
            }}
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
            updateTour={({ attribute, value }) => {
              setDetail((prev) => ({
                ...prev,
                tours: {
                  ...prev.tours,
                  [attribute]: value,
                },
              }));
            }}
            cleanTour={(e) => {
              setDetail((prev) => ({
                ...prev,
                tours: {},
              }));
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
          <TableFinalPrice
            kids={kids}
            rows={totalPriceByHotels}
          />

          <div className="grid grid-cols-2 grid-rows-3 gap-4 ">
            {totalPriceByHotels.map((e) => <PriceCard kids={kids} services={e.services} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
