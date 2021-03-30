import { getBox } from 'css-box-model';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import styled from "styled-components/macro";

type Props = {
    text: string
    margin: string
    place: string
}

const TooltipComponent: React.FC<Props> = (props) => {
    const [isShow, setShow] = useState(false)
    const tooltipRef = useRef(null)

    const place = props.place

    const getTooltipPosition = (place: string) => {
        const coords = getBox(tooltipRef.current as any)

        switch (place) {
            case 'top': {
                if (coords.contentBox.right + 7 > window.innerWidth) {
                    return TooltipTopLeft
                }
                return TooltipTop


            }
            case 'bottom': {
                if (coords.contentBox.right + 7 > window.innerWidth) {
                    return TooltipBottomLeft
                }
                return TooltipBottom
            }
            case 'right': {
                if (coords.contentBox.right + 7 > window.innerWidth) {
                    return TooltipLeft
                }
                return TooltipRight
            }
        }


    }

    const TooltipRender = useMemo(() => {
        console.log('render tooltip')
        switch (props.place) {
            case 'top': {
                if (tooltipRef.current) {
                 return  getTooltipPosition(props.place) as any
                }
                return TooltipTop


            }

            case 'bottom': {
                if (tooltipRef.current) {
                    return  getTooltipPosition(props.place)
                }
                return TooltipBottom
            }

            case 'left': {
                return TooltipLeft
            }

            case 'right': {
                if (tooltipRef.current) {
                    return  getTooltipPosition(props.place) }
                return TooltipRight
            }

            default: return TooltipTop
        }
    }, [isShow,window.innerWidth])

    const Enter = React.useCallback(() => setShow(true), [place])

    return (
        <>
            <TooltipWrapper>
                <Target  onMouseEnter={Enter} onMouseLeave={() => setShow(false)}>{props.children}</Target>
                <TooltipRender margin={props.margin} ref={tooltipRef} style={isShow ? {opacity: 1} : undefined}><p>{props.text}</p></TooltipRender>
            </TooltipWrapper>
        </>


    );
};

export default TooltipComponent;


const Target = styled.div`
  position: relative;
`

const TooltipWrapper = styled.div`
  position: relative;
`
type TooltipType = {
    position: {}
}
const Tooltip = styled.div<any>`
  pointer-events: none;
  opacity: 0;
  transition: opacity .33s ease-in-out;
  padding: 5px;
  color: white;
  font-size: 12px;
  background-color: rgba(0,0,0,0.5);
  position: absolute;
  border-radius: 4px;
  text-align: center;
  white-space: nowrap;
  :before {
      position: absolute;
      pointer-events: none;
      content: '';
      height: 0;
      width: 0;
      border: 3px solid transparent;
      //border-top: 3px solid rgba(0,0,0,0.5);
  }
`

export const TooltipTop = styled(Tooltip)`
  transform: translateX(-20%);
  left: 50%;
  bottom: 100%;
  margin-bottom: ${props => props.margin + 'px'};
  :before {
     border-top: 3px solid rgba(0,0,0,0.5);
     transform: translateX(-50%);
     top: 100%;
     left: 20%;
  }
  
`

export const TooltipTopLeft = styled(Tooltip)`
  transform: translateX(20%);
  right: 50%;
  bottom: 100%;
  margin-bottom: ${props => props.margin + 'px'};
  :before {
     border-top: 3px solid rgba(0,0,0,0.5);
     transform: translateX(-50%);
     top: 100%;
     left: 80%;
  }
  
`

const TooltipBottom = styled(Tooltip)`
  transform: translateX(-20%);
  left: 50%;
  top: 100%;
  margin-top: ${props => props.margin + 'px'};
  :before {
     border-bottom: 3px solid rgba(0,0,0,0.5);
     transform: translateX(-50%);
     bottom: 100%;
     left: 20%;
  }
  
`

const TooltipBottomLeft = styled(Tooltip)`
  transform: translateX(20%);
  right: 50%;
  top: 100%;
  margin-top: ${props => props.margin + 'px'};
  :before {
     border-bottom: 3px solid rgba(0,0,0,0.5);
     transform: translateX(-50%);
     bottom: 100%;
     left: 80%;
  }
  
`

const TooltipLeft = styled(Tooltip)`
  top: 50%;
  transform: translateY(-50%);
  right: 100%;
  margin-right: ${props => props.margin + 'px'};
  :before {
     border-left: 3px solid rgba(0,0,0,0.5);
     transform: translateY(-50%);
     left: 100%;
     top: 50%;
  }
  
`

const TooltipRight = styled(Tooltip)`
  top: 50%;
  transform: translateY(-50%);
  left: 100%;
  margin-left: ${props => props.margin + 'px'};
  :before {
     border-right: 3px solid rgba(0,0,0,0.5);
     transform: translateY(-50%);
     right: 100%;
     top: 50%;
  }
  
`