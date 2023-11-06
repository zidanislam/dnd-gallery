import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Item from "./Item";
import SortableItem from "./SortableItem";

const App = () => {
  const [images, setImages] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  useEffect(() => {
    fetch("./media.json")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;

    if (active.id === over.id) {
      return;
    }
    setImages((images) => {
      const oldIndex = images.findIndex((image) => image.id === active.id);
      const newIndex = images.findIndex((image) => image.id === over.id);

      return arrayMove(images, oldIndex, newIndex);
    });

    setActiveId(null);
  }, []);
  const wrapperStyle = ({ index }) => {
    if (index === 0) {
      return {
        height: 410,
        gridRowStart: "span 2",
        gridColumnStart: "span 2",
      };
    }
  
    // Mobile responsive conditions
    if (window.innerWidth <= 768) {
      return {
        width: "100%",
      };
    }
  
    return {
      width: 200,
      height: 200,
    };
  };
  
  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={images} strategy={rectSortingStrategy}>
        <div className="section">
          <h2>Gallery</h2>
          <div className="grid-box">
            <div className="grid">
              {images.map((image, index) => (
                <SortableItem
                  key={image.id}
                  wrapperStyle={wrapperStyle}
                  index={index}
                  image={image}
                  id={image.id}
                />
              ))}
            </div>
          </div>
        </div>
      </SortableContext>
      <DragOverlay adjustScale style={{ transformOrigin: "0 0" }}>
        {activeId ? <Item id={activeId} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default App;
