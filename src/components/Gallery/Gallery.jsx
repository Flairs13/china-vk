import React from 'react';
import Preloader from "../Preloader/Preloader";
import styled from "styled-components/macro";

const Gallery = (props) => {

    const imgNews = () => {
        switch (props.status) {
            case 'loading': {
                return <ImgWrapper><Preloader/></ImgWrapper>
            }
            case 'complete': {
                return  <ImgWrapper>
                            <img src={props.imgInfo.url} alt="#"/>
                        </ImgWrapper>
            }
            default: return <div><Preloader/></div>
        }
    }
    return (
        <GalleryContainer>
            <NewsWrapper>
                <h2>Новости</h2>
                {imgNews()}
                {props.error && <p style={{color: 'red'}}>{`Извините произошла ошибка ${props.error}`}</p>}
                <Button onClick={props.getImg}>Загрузить</Button>
            </NewsWrapper>
        </GalleryContainer>
    );
};

export default Gallery;

const GalleryContainer = styled.main`
  background-color: white;
  box-shadow: 0 1px 0 0 #d3d9de,0 0 0 1px #e7e8ec;
  border-radius: 4px;
`
const NewsWrapper = styled.article`
  text-align: center;
  h2 {
    padding-top: 20px;
  }
`

const ImgWrapper = styled.div`
    margin: 20px auto;
    width: 640px;
    height: 320px;
    img {
      width: 100%;
      height: 100%;
    }
`

const Button = styled.button`
    padding: 7px 16px 8px;
    margin-bottom: 20px;
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
`

