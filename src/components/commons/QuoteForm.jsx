import Input from "../primitive/Input";
import MultiSelectDropdown from "./MultipleDropDown";
import Select from "../primitive/Select";
import { useState } from "react";
import { convertTourFormat, formatTours } from "../../util/util";
import CheckBox from "../primitive/CheckBox";
export default function QuoteForm({
  clientOptions = [],
  destinations = [],
  save,
  optionsSelected = {},
  updateOnAttribute,
  updateTour,
  detail,
  onChangeAerolines,
  onChangeHotels,
  aerolinesSelected,
  setAerolinesSelected,
  hotelsSelected,
  setHotelsSelected,
  cleanTour,
}) {
  const onChangeInput = (e, attribute) => {
    const value = e.target.value;
    updateOnAttribute({ attribute, value });
  };

  const onChangeInputNumber = (e, attribute) => {
    const value = e.target.value;
    updateOnAttribute({ attribute, value: parseInt(value) });
  };

  const onChangeInputObject = (e, attribute, options) => {
    const value = e.target.checked;
    if (value) {
      const found = options.find((e) => e.id == attribute);
      console.log({ found });
      updateTour({
        attribute,
        value: {
          name: found.name,
          adultPrice: found.adultPrice,
          kidPrice: found.kidPrice,
        },
      });
    } else {
      updateTour({ attribute, value: null });
    }
  };

  const onFocus = (e, attribute, callback) => {
    const value = e.target.value;
    if (value === 0)
      callback
        ? callback({ attribute, value: "" })
        : updateOnAttribute({ attribute, value: "" });
  };

  const onFocusOut = (e, attribute, callback) => {
    const value = e.target.value;
    if (value === 0)
      callback
        ? callback({ attribute, value: "" })
        : updateOnAttribute({ attribute, value: "" });
  };

  const destination = destinations.find(
    (e) => e.id == parseInt(detail?.placeId)
  );

  return (
    <div className="flex flex-col gap-4 p-4 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Select
          options={[
            { label: "Seleccione el cliente", value: "" },
            ...clientOptions,
          ]}
          title="Cliente"
          onChange={(e) => {
            onChangeInput(e, "customer");
          }}
          value={detail?.customer}
        />
        <Select
          options={[
            { label: "Seleccione el destino", value: "" },
            ...destinations.map((e) => ({ value: e.id, label: e.name })),
          ]}
          title="Destino"
          onChange={(e) => {
            cleanTour();
            onChangeInput(e, "placeId");
            setAerolinesSelected([]);
            setHotelsSelected([]);
            onChangeAerolines([]);
            onChangeHotels([]);
          }}
          value={detail?.placeId}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="md:col-span-2">
          <Input title="Salida" type="date" value={detail.startDate || ""} onChange={(e) => { onChangeInput(e, "startDate"); }} />
        </div>

        <Input title="Días" onBlur={(e) => { onFocusOut(e, "days"); }} onFocus={(e) => { onFocus(e, "days"); }} type="number" min={1} value={detail.days} onChange={(e) => { onChangeInputNumber(e, "days"); }} />
        <Input title="Adultos" onBlur={(e) => { onFocusOut(e, "adults"); }} onFocus={(e) => { onFocus(e, "adults"); }} min={1} value={detail.adults} onChange={(e) => { onChangeInputNumber(e, "adults"); }} type={"number"} />
        <Input title="Niños " onBlur={(e) => { onFocusOut(e, "kids"); }} onFocus={(e) => { onFocus(e, "kids"); }} min={0} value={detail.kids} onChange={(e) => { onChangeInputNumber(e, "kids"); }} type={"number"} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Input title="fee Adulto" onBlur={(e) => { onFocusOut(e, "adultFee"); }} onFocus={(e) => { onFocus(e, "adultFee"); }} type="number" min={100} value={detail.adultFee || 0} onChange={(e) => { onChangeInputNumber(e, "adultFee"); }} />
        <Input title="fee Niño" onBlur={(e) => { onFocusOut(e, "kidFee"); }} onFocus={(e) => { onFocus(e, "kidFee"); }} type="number" min={100} value={detail.kidFee} onChange={(e) => { onChangeInputNumber(e, "kidFee"); }} />
        <Input title="Traslado" onBlur={(e) => { onFocusOut(e, "traslado"); }} onFocus={(e) => { onFocus(e, "traslado"); }} type="number" min={0} value={detail.traslado} onChange={(e) => { onChangeInputNumber(e, "traslado"); }} />
      </div>



      <div
        className={`grid grid-cols-${destination?.tours.length <= 4
          ? destination?.tours.length
          : "2"
          } gap-4 border-2 border-blue-200 border-dotted p-4 ${Object.keys(destination?.tours || {}).length === 0 && "hidden"
          } `}
      >
        {destination?.tours.map((tour) => (
          <CheckBox
            title={tour.name}
            checked={detail.tours && detail.tours[tour.id] != null}
            onChange={(e) => {
              onChangeInputObject(e, tour.id, destination?.tours);
            }}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MultiSelectDropdown
            prompt="Aerolineas"
            formFieldName="Aerolineas"
            options={destinations
              .find((e) => e.id == parseInt(detail?.placeId))
              ?.aerolines.map((e) => ({ value: e.tableId, label: e.name }))}
            initialValues={optionsSelected?.aerolines || []}
            optionsSelected={aerolinesSelected}
            onChange={(e) => {
              onChangeAerolines(e);
              setAerolinesSelected(e); //
            }}
          />
          <MultiSelectDropdown
            prompt="Hoteles"
            formFieldName="Hoteles"
            options={destinations
              .find((e) => e.id == parseInt(detail?.placeId))
              ?.hotels.map((e) => ({ value: e.tableId, label: e.name }))}
            initialValues={optionsSelected?.hotels || []}
            optionsSelected={hotelsSelected}
            onChange={(e) => {
              onChangeHotels(e);
              setHotelsSelected(e);
            }}
          />
      </div>
      <div className="w-full text-center p-2 dark:bg-boxdark dark:text-white hover:animate-pulse">
        <button
          className="shadow-default dark:bg-blue-900 bg-blue-700 text-white w-full rounded-lg p-2"
          onClick={save}
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
