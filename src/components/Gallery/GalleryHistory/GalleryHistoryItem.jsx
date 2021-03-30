import React, {useEffect, useRef} from 'react';
import styled from "styled-components/macro";
import {useDrag} from "react-dnd";
import {getEmptyImage} from "react-dnd-html5-backend";

const GalleryHistoryItem = ({id,url,deleteHistoryItem,item}) => {
    const img = useRef(null)

    const [{isDragging}, drag, preview] = useDrag (
        {item: {type: 'box', id, url, imgItem: img},
            end: (item, monitor) => {
                const dropResult = monitor.getDropResult();
                if (item && dropResult) {
                    deleteHistoryItem(id)
                }
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        });
    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, []);



    return (
            <Item width={item} isDrag={isDragging}  ref={drag} key={id} onClick={() => {deleteHistoryItem(id)}}>
                <ItemImg ref={img}  key={id} src={url} alt="#"/>
            </Item>
    );
};

export default GalleryHistoryItem;


const Item = styled.li`
   ${props => props.width ? `width : ${props.width.current.offsetWidth}px` : null};
   height: 150px;
   cursor: grab;
   ${props => props.isDrag ? 'opacity: 0.4' : null}
  
`

const ItemImg = styled.img`
    width: 100%;
    height: 100%;
`
