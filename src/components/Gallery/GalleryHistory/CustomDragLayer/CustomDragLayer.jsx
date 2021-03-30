import React from "react";
import { useDragLayer } from "react-dnd";
import { BoxDragPreview } from "./BoxDragPreview";
const layerStyles = {
    position: "fixed",
    pointerEvents: "none",
    zIndex: 100,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%"
};
function getItemStyles(initialOffset, currentOffset, isSnapToGrid) {
    if (!initialOffset || !currentOffset) {
        return {
            display: "none"
        };
    }
    let { x, y } = currentOffset;
    if (isSnapToGrid) {
        x -= initialOffset.x;
        y -= initialOffset.y;
        x += initialOffset.x;
        y += initialOffset.y;
    }
    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform,
    };
}
export const CustomDragLayer = (props) => {
    const {
        itemType,
        isDragging,
        item,
        initialOffset,
        currentOffset
    } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging()
    }));



    return (
        <div style={layerStyles}>
            <div style={getItemStyles(initialOffset, currentOffset)}>
                <BoxDragPreview item={item && item.imgItem ? item.imgItem : null} id={item ? item.id : null} url={item ? item.url : null}/>
            </div>
        </div>
    );
};
