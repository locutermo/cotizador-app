import Input from "../primitive/Input";
import MultiSelectDropdown from "./MultipleDropDown";
import Select from "../primitive/Select";
import { useState } from "react";
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
  cleanTour
}) {

  const onChangeInput = (e, attribute) => {
    const value = e.target.value;
    updateOnAttribute({ attribute, value });
  };

  const onChangeInputNumber = (e, attribute) => {
    const value = e.target.value;
    updateOnAttribute({ attribute, value: parseInt(value) });
  };

  const onChangeInputObject = (e, attribute) => {
    const value = e.target.value;
    updateTour({ attribute, value: parseInt(value) });
  }

  const onFocus = (e, attribute, callback) => {
    const value = e.target.value;
    if (value === 0) callback ? callback({ attribute, value: "" }) : updateOnAttribute({ attribute, value: "" });
  };

  const onFocusOut = (e, attribute, callback) => {
    const value = e.target.value;
    if (value === 0) callback ? callback({ attribute, value: "" }) : updateOnAttribute({ attribute, value: "" });
  };

  const destination = destinations.find(e => e.id == parseInt(detail?.placeId))

  return (

    <div className="grid grid-cols-6 gap-4 p-4 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="col-span-6">
      </div>
      <div className="col-span-2">
        <Select
          options={[
            { label: "Selecciona el cliente", value: "" },
            ...clientOptions,
          ]}
          title="Nombres y Apellidos"
          onChange={(e) => {
            onChangeInput(e, "customer");
          }}
          value={detail?.customer}
        />
      </div>
      <div className="col-span-2">
        <Select
          options={[
            { label: "Selecciona el destino", value: "" },
            ...destinations.map(e => ({ value: e.id, label: e.name })),
          ]}
          title="Destino de viaje"
          onChange={(e) => {
            cleanTour();
            onChangeInput(e, "placeId");
            setAerolinesSelected([]);
            setHotelsSelected([]);
            onChangeAerolines([]);
            onChangeHotels([]);
            // onChangeInputObject()
          }}
          value={detail?.placeId}
        />
      </div>
      <div className="col-span-2">
        <Input
          title="Fecha de Salida"
          type="date"
          value={detail.startDate || ""}
          onChange={(e) => {
            onChangeInput(e, "startDate");
          }}
        />
      </div>

      <Input
        title="Nº días"
        onBlur={(e) => {
          onFocusOut(e, "days");
        }}
        onFocus={(e) => {
          onFocus(e, "days");
        }}
        type="number"
        min={1}
        value={detail.days}
        onChange={(e) => {
          onChangeInputNumber(e, "days");
        }}
      />
      <Input
        title="Nº Adultos"
        onBlur={(e) => {
          onFocusOut(e, "adults");
        }}
        onFocus={(e) => {
          onFocus(e, "adults");
        }}
        min={1}
        value={detail.adults}
        onChange={(e) => {
          onChangeInputNumber(e, "adults");
        }}
        type={"number"}
      />
      <Input
        title="Nº Niños "
        onBlur={(e) => {
          onFocusOut(e, "kids");
        }}
        onFocus={(e) => {
          onFocus(e, "kids");
        }}
        min={0}
        value={detail.kids}
        onChange={(e) => {
          onChangeInputNumber(e, "kids");
        }}
        type={"number"}
      />

      <Input
        title="fee Adulto"
        onBlur={(e) => {
          onFocusOut(e, "adultFee");
        }}
        onFocus={(e) => {
          onFocus(e, "adultFee");
        }}
        type="number"
        min={100}
        value={detail.adultFee || 0}
        onChange={(e) => {
          onChangeInputNumber(e, "adultFee");
        }}
      />
      <Input
        title="fee Niño"
        onBlur={(e) => {
          onFocusOut(e, "kidFee");
        }}
        onFocus={(e) => {
          onFocus(e, "kidFee");
        }}
        type="number"
        min={100}
        value={detail.kidFee}
        onChange={(e) => {
          onChangeInputNumber(e, "kidFee");
        }}
      />
      <Input
        title="Traslado"
        onBlur={(e) => {
          onFocusOut(e, "traslado");
        }}
        onFocus={(e) => {
          onFocus(e, "traslado");
        }}
        type="number"
        min={0}
        value={detail.traslado}
        onChange={(e) => {
          onChangeInputNumber(e, "traslado");
        }}
      />
      {/* <Input
        title="Isla Saona"
        onBlur={(e) => {
          onFocusOut(e, "islaSaona");
        }}
        onFocus={(e) => {
          onFocus(e, "islaSaona");
        }}
        type="number"
        min={0}
        value={detail.islaSaona}
        onChange={(e) => {
          onChangeInputNumber(e, "islaSaona");
        }}
      />
      <div className="col-span-2">
        <Input
          title="Santo Domingo"
          onBlur={(e) => {
            onFocusOut(e, "santoDomingo");
          }}
          onFocus={(e) => {
            onFocus(e, "santoDomingo");
          }}
          type="number"
          min={0}
          value={detail.santoDomingo}
          onChange={(e) => {
            onChangeInputNumber(e, "santoDomingo");
          }}
        />
      </div> */}
      <div className={`col-span-6 grid grid-cols-${destination?.tours.length<=5 ? destination?.tours.length : "4"} gap-4 border-2 border-blue-200 border-dotted p-4`}>
        {destination?.tours.map(tour => (
          <Input
            title={tour.name}
            onBlur={(e) => {
              onFocusOut(e, `tour_${tour.id}`, updateTour);
            }}
            onFocus={(e) => {
              onFocusOut(e, `tour_${tour.id}`, updateTour);
            }}
            type="number"
            min={0}
            value={detail?.tours[`tour_${tour.id}`] ? detail?.tours[`tour_${tour.id}`] : ''}
            onChange={(e) => {
              console.log({ e })
              onChangeInputObject(e, `tour_${tour.id}`);
            }}
          />

        ))}


      </div>
      <div className="col-span-6  flex gap-4">
        <div className="w-1/2">
          <MultiSelectDropdown
            prompt="Aerolineas"
            formFieldName="Aerolineas"
            options={destinations.find(e => e.id == parseInt(detail?.placeId))?.aerolines.map(e => ({ value: e.tableId, label: e.name }))}
            initialValues={optionsSelected?.aerolines || []}
            optionsSelected={aerolinesSelected}
            onChange={(e) => {
              onChangeAerolines(e);
              setAerolinesSelected(e); //
            }}
          />
        </div>
        <div className="w-1/2">
          <MultiSelectDropdown
            prompt="Hoteles"
            formFieldName="Hoteles"
            options={destinations.find(e => e.id == parseInt(detail?.placeId))?.hotels.map(e => ({ value: e.tableId, label: e.name }))}
            initialValues={optionsSelected?.hotels || []}
            optionsSelected={hotelsSelected}
            onChange={(e) => {
              onChangeHotels(e);
              setHotelsSelected(e)
            }}
          />
        </div>
      </div>
      <div className="col-span-6 text-center p-2 dark:bg-boxdark dark:text-white hover:animate-pulse">
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
