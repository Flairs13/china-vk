import React, {useEffect, useRef} from 'react';
import styled from "styled-components/macro";
import CanvasTools from "./CanvasTools";


const CanvasSide = (props) => {
    const canvasWrapperRef = useRef(null)
    const canvasRef = useRef (null)
    let ctx;
    let prevValues = {}
    let isDrawing = false
    let isMouseDown = false
    let lineWidth = 50
    let lineColor = "rgb(0,0,0)"
    let opacity = 50


    const handleClickOutside = (event) => {
        if (canvasWrapperRef.current && !canvasWrapperRef.current.contains(event.target )) {
            props.setCanvas(false)
        }
    }

    useEffect (() => {
        resizeCanvas ()

        window.addEventListener ('mouseup', () => {isMouseDown = false})
        window.addEventListener ('resize', resizeCanvas, false);
        window.addEventListener('click', handleClickOutside,true)

        return () => {
            window.removeEventListener ('mouseup', () => {})
            window.removeEventListener ('resize', resizeCanvas, false);
            window.removeEventListener('click', handleClickOutside,true)
        }
    }, [])

    const canvasTools = (event) => {
        switch (event.target.name) {
            case "number" : {
                lineWidth = event.target.value
                break
            }

            case "color" : {
                lineColor = event.target.value
                break
            }

            case "clear" : {
                ctx.clearRect (0, 0, ctx.canvas.width, ctx.canvas.height);
                break
            }

            case "opacity" : {
                opacity = event.target.value
                break
            }

            default:
                return

        }
    }



    const draw = (x,y) => {
        const ctx = canvasRef.current.getContext ('2d')


        ctx.beginPath ()
        ctx.strokeStyle = lineColor
        ctx.globalAlpha = opacity / 100;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = +lineWidth
        ctx.moveTo (prevValues.x, prevValues.y)
        ctx.lineTo (x, y)
        ctx.stroke ()
        console.log (opacity / 100)
    }

    const mouseDown = (event) => {
        const pos = {x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY}
        prevValues = {x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY}
        isDrawing = true
        isMouseDown = true
        draw(pos.x,pos.y)

    }

    const mouseOver = () => {
        if (isMouseDown) {
            isDrawing = true
        }
    }

    function resizeCanvas () {
        ctx = canvasRef.current.getContext ('2d')
        const rect = canvasRef.current.getBoundingClientRect ()
        const scale = window.devicePixelRatio
        ctx.canvas.width = rect.width * scale
        ctx.canvas.height = rect.height * scale
        ctx.scale (scale, scale)
    }


    const mouseMove = (event) => {
        if (isDrawing) {
            const pos = {x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY}
            if (Object.keys(prevValues).length === 0) {
                prevValues = {x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY}
            }
            draw(pos.x,pos.y)
            prevValues = {x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY}
        }
    }


    return (
        <CanvasWrapper ref={canvasWrapperRef}>
            <button onClick={() => {props.setCanvas(false); props.setFileImg(ctx.canvas.toDataURL()); props.setTextarea(true); props.setFieldValue("file", ''); props.setFieldValue('images', ctx.canvas.toDataURL())}}>Добавить пост</button>
            <Canvas ref={canvasRef}
                    onMouseOver={mouseOver}
                    onMouseOut={() => {
                        isDrawing = false;
                        prevValues = {}
                    }}
                    onMouseUp={() => {
                        isDrawing = false;
                        prevValues = {}
                    }}
                    onMouseDown={mouseDown}
                    onMouseMove={mouseMove}
            />
            <CanvasTools opacity={opacity}  lineColor={lineColor} lineWidth={lineWidth} canvasTools={canvasTools}/>
        </CanvasWrapper>

    );
};

export default CanvasSide

const Canvas = styled.canvas`
 width: 100%;
 height: 500px;
 border: 1px solid black;
 background-color: white;
 display: block;

`

const CanvasWrapper = styled.div`
 background-color: white;
max-width: 800px;
margin: 0 auto;
margin-top: 50px;
`


