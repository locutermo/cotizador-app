import React, { useState, useCallback, useRef, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { COLUMN_NAMES } from "../../../util/constants";



const { VALUES_TO_ASSIGN, VALUES_ASSIGNED } = COLUMN_NAMES;
export const tasks = [
  { id: 1, name: 'Item 1', column: VALUES_TO_ASSIGN },
  { id: 2, name: 'Item 2', column: VALUES_TO_ASSIGN },
  { id: 3, name: 'Item 3', column: VALUES_TO_ASSIGN },
  { id: 4, name: 'Item 4', column: VALUES_TO_ASSIGN },
];
const MovableItem = ({
  name,
  index,
  currentColumnName,
  moveCardHandler,
  setItems
}) => {
  const changeItemColumn = (currentItem, columnName) => {
    setItems((prevState) => {
      return prevState.map((e) => {
        return {
          ...e,
          column: e.name === currentItem.name ? columnName : e.column
        };
      });
    });
  };

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "TABLE",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCardHandler(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'TABLE',
    item: { index, name, currentColumnName, type: "TABLE" },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        const { name } = dropResult;
        const { VALUES_TO_ASSIGN, VALUES_ASSIGNED } = COLUMN_NAMES;
        switch (name) {
          case VALUES_ASSIGNED:
            changeItemColumn(item, VALUES_ASSIGNED);
            break;
          case VALUES_TO_ASSIGN:
            changeItemColumn(item, VALUES_TO_ASSIGN);
            break;
          default:
            break;
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} className="border-2 border-blue-700 bg-[#fafdff]" style={{ opacity }}>
      {name}
    </div>
  );
};

const Column = ({ children, className, title }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "TABLE",
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    // Override monitor.canDrop() function
    canDrop: (item) => {
      console.log({ item })
      const { VALUES_TO_ASSIGN, VALUES_ASSIGNED } = COLUMN_NAMES;
      const { currentColumnName } = item;
      return (
        currentColumnName === title ||
        (currentColumnName === VALUES_TO_ASSIGN && title === VALUES_ASSIGNED) ||
        (currentColumnName === VALUES_ASSIGNED && title === VALUES_TO_ASSIGN)
      );
    }
  });

  const getBackgroundColor = () => {
    if (isOver) {
      if (canDrop) {
        return "rgb(188,251,255)";
      } else if (!canDrop) {
        return "rgb(255,188,188)";
      }
    } else {
      return "";
    }
  };

  return (
    <div
      ref={drop}
      className={`p-4 gap-2 flex flex-col text-center ${className}`}
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <p>{title}</p>
      {children}
    </div>
  );
};

export default function DragAsign({items}) {
  const [_items, setItems] = useState(tasks);

  useEffect(()=> {
    setItems(items)
  },[])

  const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = _items[dragIndex];

    if (dragItem) {
      setItems((prevState) => {
        const coppiedStateArray = [...prevState];

        // remove item by "hoverIndex" and put "dragItem" instead
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

        // remove item by "dragIndex" and put "prevItem" instead
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return coppiedStateArray;
      });
    }
  };

  const returnItemsForColumn = (columnName) => {
    return _items
      .filter((item) => item.column === columnName)
      .map((item, index) => (
        <MovableItem
          key={item.id}
          name={item.name}
          currentColumnName={item.column}
          setItems={setItems}
          index={index}
          moveCardHandler={moveCardHandler}
        />
      ));
  };

  const { VALUES_TO_ASSIGN, VALUES_ASSIGNED } = COLUMN_NAMES;

  return (
    <>
      <div className="flex min-w-132.5 gap-6">
        <DndProvider backend={HTML5Backend}>
          <Column title={VALUES_TO_ASSIGN} className="bg-blue-200 w-1/2">
            {returnItemsForColumn(VALUES_TO_ASSIGN)}
          </Column>
          <Column title={VALUES_ASSIGNED} className="bg-orange-200 w-1/2">
            {returnItemsForColumn(VALUES_ASSIGNED)}
          </Column>
        </DndProvider>
      </div>
      {JSON.stringify(_items)}
    </>
  );
};
