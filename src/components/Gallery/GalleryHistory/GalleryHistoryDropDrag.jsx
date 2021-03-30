import React from 'react';
import styled from "styled-components/macro";
import {useDrop} from "react-dnd";
import {keyframes} from "styled-components/macro";
import {css} from "styled-components";

const GalleryHistoryDropDrag = () => {

    const [{canDrop, isOver}, drop] = useDrop (
        {
            accept: 'box',
            drop: () => ({name: 'test'}),
            collect: (monitor) => ({isOver: monitor.isOver (), canDrop: monitor.canDrop (),}),
        }
    );

    return (
        <DropContainer canDrop={canDrop} isOver={isOver} ref={drop}>
            <p>{'Перенеси сюда чтобы удалить'}</p>
        </DropContainer>
    );
};

export default GalleryHistoryDropDrag;


const rotate = keyframes`
    to {
        outline-color: #2cbedc;
        box-shadow: 0 0 0 5px #E0E4CC;
    }

`

const DropContainer = styled.div`
  width: 300px;
  height: 200px;
  outline: 5px dashed #E0E4CC;
  box-shadow: 0 0 0 5px #69d2e7;
  margin: 100px auto 0 auto;
  display:flex;
  justify-content: center;
  align-items: center;
  ${props => props.isOver ? 'background-color: #69d2e7' : null};
  transition: background-color .33s ease-in-out;
  animation: ${props => props.canDrop ? css`${rotate} 1s ease infinite` : null};
    
`

