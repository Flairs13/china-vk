import React, {useCallback, useEffect, useRef} from 'react';
import styled from "styled-components/macro";


const CanvasTools = ({canvasTools, lineWidth, lineColor,opacity}) => {
    const canvasRef = useRef (null)

    let color = lineColor
    let width = lineWidth
    let opacityBrush = opacity / 100

    const draw = useCallback(() => {
        const ctx = canvasRef.current.getContext ('2d')
        const rect = canvasRef.current.getBoundingClientRect ()
        const scale = window.devicePixelRatio
        canvasRef.current.width = rect.width * scale
        canvasRef.current.height = rect.height * scale
        ctx.scale (scale, scale)

        ctx.beginPath ()
        ctx.strokeStyle = color
        ctx.globalAlpha = opacityBrush;
        ctx.shadowBlur = 1;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = +width
        ctx.moveTo (60, 60)
        ctx.lineTo (60, 60)
        ctx.stroke ()
    },[canvasRef])

    useEffect (() => {
        draw(lineWidth)
    },[draw,lineWidth])






    const onChange = event => {
        canvasTools (event)
        switch (event.target.name) {
            case "number" : {
                width = event.target.value
                break
            }

            case "color" : {
                color = event.target.value
                break
            }

            case "opacity" : {
                opacityBrush = event.target.value / 100
                break
            }

            default:
                return

        }


        draw ()
    }
    return (
        <CanvasToolsWrapper>
            <li>
                <CanvasBrushWrapper>
                    <CanvasBrush ref={canvasRef}/>
                </CanvasBrushWrapper>
            </li>
            <li>
                <Label>
                    Цвет:
                    <input type="color" name="color" id="color" onChange={onChange}/>
                </Label>
            </li>
            <li>
                <Label>
                    Толщина:
                    <input type="range" min='1' max='100' step='1' name="number" id="number" onChange={onChange}/>
                </Label>
            </li>
            <li>
                <Label>
                    Интенсивность:
                    <input type="range" min='1' step='1' max='100' name="opacity" id="opacity"  onChange={onChange}/>
                </Label>
            </li>
            <li>
                <ButtonWrapper>
                    <Button name="clear" onClick={canvasTools}>Очистить</Button>
                </ButtonWrapper>
            </li>






        </CanvasToolsWrapper>
    );
};

export default CanvasTools;

const CanvasToolsWrapper = styled.ul`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  li {
    margin-right: 15px;
  }
`

const CanvasBrushWrapper = styled.div`

`

const CanvasBrush = styled.canvas`
  width: 120px;
  height: 120px;
`

const Label = styled.label`
  display: flex;
  input {
    margin-left: 10px;
    width: 50px;
  }

`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Button = styled.button`
    padding: 7px 16px 8px;
    margin: 0;
    cursor: pointer;
    text-align: center;
    background-color: #5181b8;
    border: 0;
    border-radius: 4px;
    color: #fff;
    &:hover {
    opacity: 0.88;
    }
    &:active {
    background-color: #4a76a8;
    padding-top: 8px;
    padding-bottom: 7px;
    }
    &:disabled{
    opacity: 0.5;
    }
`