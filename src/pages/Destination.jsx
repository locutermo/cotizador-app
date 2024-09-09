import Breadcrumb from "../components/commons/Breadcrumbs/Breadcrumb";
import Form from "../components/commons/Forms/Form";
import Table from "../components/commons/Table/Table";
import { useSelector, useDispatch } from "react-redux";
import {
  addDestination,
  assignAerolineToDestination,
  assignHotelToDestination,
  editDestination,
  removeAerolineFromDestination,
  removeDestination,
  removeHotelFromDestination,
} from "../features/destinations/thunks";
import { destinationsFormattedSelector } from "../features/destinations/destinationSlice";
import { useState } from "react";
import Modal from "../components/commons/Modal/Modal";
import { useModal } from "../hooks/useModal";
import DragAsign from "../components/commons/DragAsign/DragAsign";
import { COLUMN_NAMES, TABLE_NAMES } from "../util/constants";
import { inputs } from "../util/configurations/destination";
import { aerolineToAssign } from "../features/aerolines/aerolineSlice";
import { hotelToAssign } from "../features/hotels/hotelSlice";
export default function Destinations() {
  const dispatch = useDispatch();
  const [isOpenAeroline, toogleAeroline] = useModal();
  const [isOpenHotel, toogleHotel] = useModal();
  const [selected, setSelected] = useState();
  const [idDestination, setIdDestination] = useState();
  const destinations = useSelector(destinationsFormattedSelector);
  const aerolinesToAssign = useSelector(aerolineToAssign);
  const hotelsToAssign = useSelector(hotelToAssign);

  const getItems = (idDestination, prevItems, items, attribute) => {
    const itemFromDestinationSelected = prevItems.find(
      (e) => e.id === idDestination
    );
    if (!itemFromDestinationSelected) return [];
    const itemsCreated = itemFromDestinationSelected[attribute];

    let newItems = [...items];
    newItems = newItems.map((item) => {
      const found = itemsCreated.find(
        (itemCreated) => itemCreated.tableId === item.id
      );
      if (found)
        return {
          ...found,
          column: COLUMN_NAMES.VALUES_ASSIGNED,
        };
      return {
        ...item,
        id: 0,
        tableId: item.id,
      };
    });

    return newItems;
  };

  const headers = [
    {
      attribute: "name",
      title: "Nombre",
      type: "text",
    },
    {
      attribute: "country",
      type: "text",
      title: "País",
    },
    {
      title: "Acciones",
      type: "callbacks",
      callbacks: [
        {
          Component: (props) => (
            <button {...props}>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                />
              </svg>
            </button>
          ),
          callback: (e) => {
            setIdDestination(e.id);
            toogleHotel();
          },
        },
        {
          Component: (props) => (
            <button {...props}>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </button>
          ),
          callback: (e) => {
            setIdDestination(e.id);
            toogleAeroline();
          },
        },
        {
          Component: (props) => (
            <button {...props}>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
          ),
          callback: (e) => {
            setSelected(e);
          },
        },
        {
          Component: (props) => (
            <button {...props} className="hover:text-primary">
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                  fill=""
                />
                <path
                  d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                  fill=""
                />
                <path
                  d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                  fill=""
                />
                <path
                  d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                  fill=""
                />
              </svg>
            </button>
          ),
          callback: (e) => {
            if (e.reservations > 0) {
              alert("No se puede eliminar, ya tiene cotizaciones");
            } else {
              dispatch(removeDestination(e.id));
            }
          },
        },
      ],
    },
  ];

  const itemCanBeAdded = (prevItems, item) => {
    const found = prevItems.find((e) => e.tableId === item.tableId);
    return !found;
  };

  const itemCanBeRemoved = (prevItems, item) => {
    const found = prevItems.find((e) => e.tableId === item.tableId);
    return found != null;
  };

  const getlementToDestination = (prevItems, items) => {
    const assigned = items.filter(
      (item) => item.column === COLUMN_NAMES.VALUES_ASSIGNED
    );
    const toAssign = items.filter(
      (item) => item.column === COLUMN_NAMES.VALUES_TO_ASSIGN
    );
    console.log(
      { prevItems, items, assigned, toAssign },
      "getElementToDestination"
    );
    return {
      toRemove: toAssign.filter((item) => itemCanBeRemoved(prevItems, item)),
      toAssign: assigned.filter((item) => itemCanBeAdded(prevItems, item)),
    };
  };

  const addAndRemoveHotelFromDestination = (
    destinationId,
    destinations,
    items
  ) => {
    const currentHotelsFromDestination = destinations.find(
      (e) => e.id === destinationId
    )?.hotels;
    const { toRemove, toAssign } = getlementToDestination(
      currentHotelsFromDestination,
      items
    );
    if (toAssign.length > 0)
      dispatch(
        assignHotelToDestination({
          id: destinationId,
          items: toAssign.map((e) => ({
            places_id: destinationId,
            hotels_id: e.tableId,
          })),
        })
      );

    toRemove
      .filter((e) => e.id > 0)
      .map((e) =>
        dispatch(removeHotelFromDestination({ destinationId, id: e.id }))
      );
  };

  const addAndRemoveAerolineFromDestination = (
    destinationId,
    destinations,
    items
  ) => {
    const currentAerolinesFromDestination = destinations.find(
      (e) => e.id === destinationId
    )?.aerolines;
    console.log("addAndRemoveAerolineFromDestination", {
      destinations,
      destinationId,
      items,
    });
    const { toRemove, toAssign } = getlementToDestination(
      currentAerolinesFromDestination,
      items
    );
    if (toAssign.length > 0)
      dispatch(
        assignAerolineToDestination({
          id: destinationId,
          items: toAssign.map((e) => ({
            places_id: destinationId,
            aerolines_id: e.tableId,
          })),
        })
      );
    toRemove
      .filter((e) => e.id > 0)
      .map((e) =>
        dispatch(removeAerolineFromDestination({ destinationId, id: e.id }))
      );
  };

  return (
    <>
      <Breadcrumb
        current={{ name: "Destinos" }}
        previous={{ name: "Inicio", url: "" }}
      />
      <div className="flex gap-4">
        <div className="w-3/12 grid grid-cols-1 gap-4">
          <Form
            title="Creación"
            inputs={inputs}
            callback={(data) => {
              dispatch(addDestination(data));
            }}
          />
          {selected && (
            <Form
              title="Edición"
              initialValues={selected}
              inputs={[
                { title: "ID", disabled: true, attribute: "id", type: "text" },
                ...inputs,
              ]}
              callback={(data) => {
                dispatch(editDestination(data));
                setSelected(null);
              }}
            />
          )}
        </div>
        <div className="w-9/12">
          <Modal isOpen={isOpenAeroline} toogle={toogleAeroline}>
            <DragAsign
              type={TABLE_NAMES.TABLE_AEROLINE}
              items={getItems(
                idDestination,
                destinations,
                aerolinesToAssign,
                "aerolines"
              )}
              save={(items) => {
                addAndRemoveAerolineFromDestination(
                  idDestination,
                  destinations,
                  items
                );
                toogleAeroline();
              }}
            />
          </Modal>
          <Modal isOpen={isOpenHotel} toogle={toogleHotel}>
            <DragAsign
              type={TABLE_NAMES.TABLE_HOTEL}
              items={getItems(
                idDestination,
                destinations,
                hotelsToAssign,
                "hotels"
              )}
              save={(items) => {
                addAndRemoveHotelFromDestination(
                  idDestination,
                  destinations,
                  items
                );
                toogleHotel()
              }}
            />
          </Modal>
          <Table data={destinations} headers={headers} />
        </div>
      </div>
    </>
  );
}
