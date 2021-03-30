import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components/macro";
import CanvasSide from "./Canvas/CanvasSide";
import {ErrorMessage, Form, Formik} from 'formik';
import {ReactComponent as Exit} from "../../../../assets/images/close-cross.svg";
import {ReactComponent as PhotosSvg} from "../../../../assets/images/camera.svg";
import {ReactComponent as GraffitiSvg} from "../../../../assets/images/color-palette.svg";
import * as yup from 'yup'

import {ProfileType} from "../../../../Types/Types";
import TooltipComponent from "../../../common/Tooltip/Tooltip";
import {createDate} from '../../../common/Data/createDate';
import TestArea from './test';

type Posts = {
    id: number
    payload: string | object
}
type Props = {
    addPost: (url: string,date: string) => void
    posts: Array<Posts>
    profile: ProfileType | null
}

const validationSchema = yup.object().shape({
    message: yup.string().max(120)
})


const ProfileSide: React.FC<Props> = (props) => {
    const [isCanvas, setCanvas] = useState(false)
    const [isShowTextarea, setTextarea] = useState(false)
    const [fileImg, setFileImg] = useState(null || undefined)
    const textArea = useRef<HTMLTextAreaElement>() as any
    const inputFile = useRef<HTMLInputElement>() as any
    const showTextarea = useRef() as any
    const canvasRef = useRef() as any

    const fileImages = (event: any) => {
        if (!event) return
        setFileImg(URL.createObjectURL(event) as any)
    };


    const onSubmit = (values: any, onSubmitProps: any) => {
        if (!values.message && !values.file && !values.images) return
        props.addPost(values,createDate())
        onSubmitProps.resetForm({values: {}})
        setTextarea(false)
        setFileImg(null as any)
        inputFile.current.value = ''
    }

    const handleClickOutside = (event: MouseEvent): void => {
        if (showTextarea.current && !showTextarea.current.contains(event.target as Node) && !textArea.current.value && !canvasRef.current) {
            setTextarea(false)
            document.removeEventListener('click', handleClickOutside, true);
        }
    };

    const handleClickTextArea = () => {
        setTextarea(true)
        document.addEventListener('click', handleClickOutside, true);
    }


    const photo = (setFieldValue: (a: string,b: string) => void) => {
        return (
            <Label>
                <IconsWrapper>
                    <TooltipComponent text={'Фотография'} margin={'10'} place={'top'}>
                        <PhotoSvgIcon/>
                    </TooltipComponent>
                </IconsWrapper>
                <input ref={inputFile} id="file" name="file" type="file" onChange={(event: any) => {
                    setFieldValue("file", event.currentTarget.files[0])
                    setTextarea(true)
                    setFieldValue("images", '')
                    fileImages(event.currentTarget.files[0])
                    document.addEventListener('click', handleClickOutside, true);
                }}/>
                <ErrorMessage name='message' component="div"/>
            </Label>
        )
    }
    const graffiti = () => {
        return (
            <IconsWrapper onClick={() => setCanvas(true)}>
                <TooltipComponent text={'Граффити'} margin={'10'} place={'top'}>
                    <Graffiti/>
                </TooltipComponent>
            </IconsWrapper>
        )
    }
    return (
        <ProfileSideContainer>
            <ProfileSideHeader>
                <Formik validationSchema={validationSchema} initialValues={{ message: '', file: '', images: ''}} onSubmit={onSubmit}>
                    {({values, resetForm, setFieldValue, handleChange, handleBlur, isValid}) => (
                        <Form>
                                {isShowTextarea ?
                                    <ShowTextarea ref={showTextarea}>
                                        <TestArea>
                                              <textarea style={{resize: 'none', width: '100%',border: 'none', height: '70px',}} ref={textArea}
                                                        value={values.message}
                                                        placeholder={'Что нового брат?'}
                                                        onFocus={() => true}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        name="message"/>
                                        </TestArea>
                                       <ToolsShow>
                                           <div style={{display: 'flex'}}>
                                               {photo(setFieldValue)}
                                               {graffiti()}
                                           </div>
                                           <Button disabled={!isValid} type="submit">Опубликовать</Button>
                                       </ToolsShow>

                                    </ShowTextarea> :
                                    <PostTools>
                                        <div style={{display: "flex", alignItems: "center", width: "100%"}}>
                                            <ImgUserWrapper>
                                                <img src={props.profile?.photos.small as string | undefined} alt="#"/>
                                            </ImgUserWrapper>
                                            <PostField onClick={handleClickTextArea}>Что нового брат?</PostField>
                                        </div>
                                        <Tools>
                                            {photo(setFieldValue)}
                                            {graffiti()}
                                        </Tools>
                                    </PostTools>
                                }

                                {fileImg && <FileImgWrapper>
                                    <Img>
                                        <img src={fileImg} alt="#"/>
                                        <SvgWrapper onClick={() => {setFileImg(null as any); resetForm({values: { message: values.message}} as object);  if(textArea.current) textArea.current.focus()}}>
                                            <TooltipComponent text={'Не прикреплять'} margin={'10'} place={'top'}>
                                                <Icon/>
                                            </TooltipComponent>
                                        </SvgWrapper>
                                    </Img>
                                </FileImgWrapper>
                                }

                            {isCanvas && <>
                                <CanvasContainer ref={canvasRef}>
                                    <CanvasSideWrapper>
                                        <CanvasSide setFieldValue={setFieldValue}  setTextarea={setTextarea} setFileImg={setFileImg} addPost={props.addPost} setCanvas={setCanvas}/>
                                    </CanvasSideWrapper>
                                </CanvasContainer>
                            </>
                            }
                        </Form>
                    )}
                </Formik>
            </ProfileSideHeader>
        </ProfileSideContainer>
    );
};

export default ProfileSide



const ProfileSideContainer = styled.section`
  background-color: white;
  box-shadow: 0 1px 0 0 #d3d9de,0 0 0 1px #e7e8ec;
  margin-top: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
`

const ProfileSideHeader = styled.div`
  
`

const CanvasContainer = styled.div`
    height: 100%;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.5);
    transition-duration: 1s;

`

const CanvasSideWrapper = styled.div`
  height: 100%;

`

const Label = styled.label`
  input {
    display: none;
  }
`

const FileImgWrapper = styled.div`
  position: relative;
`

const Img = styled.div`
  position: relative;
  margin: 10px;
  padding-bottom: 10px;
    img {
      width: 100%;
      border-radius: 4px;
 
  }
`

const IconsWrapper = styled.div`
    width: 30px;
    height: 100%;
    margin-left: 10px;
`

const PhotoSvgIcon = styled(PhotosSvg)`
  width: 100%;
  height: 100%;
  fill: #9e9e9e;
`

const Graffiti = styled(GraffitiSvg)`
  width: 100%;
  height: 100%;
  fill: #9e9e9e;
`

const SvgWrapper = styled.div<any>`
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
 
`
const Icon = styled(Exit)`
  fill: #ffffff;
  background-color: rgba(0,0,0,0.5);
  padding: 5px;
  width: 100%;
  height: 100%;
  
`


const Button = styled.button<any>`
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
const PostField = styled.div`
  width: 100%;
  line-height: 30px;
  cursor: text;
`

const PostTools = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`

const ShowTextarea = styled.div`
  padding: 5px;
`

const Tools = styled.div`
display: flex;
align-items: center;
`
const ToolsShow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`
const ImgUserWrapper = styled.div`
  margin-right: 10px;
    img {
        border-radius: 50%;
        width: 40px;
    }
`