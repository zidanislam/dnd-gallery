import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import Item from "./Item";

const SortableItem = ({ props, image, index, wrapperStyle }) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    ...wrapperStyle({ index }),
  };

  return (
    <Item
      ref={setNodeRef}
      style={style}
      withOpacity={isDragging}
      image={image}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};

export default SortableItem;
