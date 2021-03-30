import React from 'react';
import styled from "styled-components/macro";
import {connect} from "react-redux";
import GalleryHistoryPagination from "./GalleryHistoryPagination/GalleryHistoryPagination";
import {deleteHistoryItem, setCurrentPages} from "../../../redux/Gallery/gallery-action";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import GalleryHistoryItem from "./GalleryHistoryItem";
import GalleryHistoryDropDrag from "./GalleryHistoryDropDrag";
import {CustomDragLayer} from "./CustomDragLayer/CustomDragLayer";
import face from '../../../assets/images/facesad.png'


const GalleryHistory = ({historyArr, deleteHistoryItem, pageSize, currentPage, setCurrentPages}) => {
    let rightBorderPageSize = currentPage * pageSize
    let leftBorderPageSize = rightBorderPageSize - pageSize

    const createItemHistory = () => {
        return historyArr
                        .slice(leftBorderPageSize, rightBorderPageSize)
                        .map(item => {
                            return(
                                    <div style={{minWidth: 0}}>
                                        <GalleryHistoryItem
                                                            id={item.id}
                                                            url={item.url}
                                                            deleteHistoryItem={deleteHistoryItem}
                                        />
                                        <Description>
                                            <p>{item.imgName ? item.imgName : 'no name'}</p>
                                            <span>{item.time}</span>
                                        </Description>
                                    </div>
                                  )


                        })


    }

    return (
        <DndProvider backend={HTML5Backend}>
            <Container>
                <h2>История новостей</h2>
                {historyArr.length === 0 ? 'Ваша история пуста' : null}
                <GalleryHistoryPagination historyArr={historyArr}
                                          pageSize={pageSize}
                                          currentPage={currentPage}
                                          setCurrentPages={setCurrentPages}
                                          leftBorderPageSize={leftBorderPageSize}
                                          rightBorderPageSize={rightBorderPageSize}
                />
                <HistoryWrapper pageSize={pageSize}>
                    {createItemHistory()}
                </HistoryWrapper>
                {historyArr.length === 0 ? <FaceSad><img src={face} alt="faceSad"/></FaceSad> :  <GalleryHistoryDropDrag/>}
                <CustomDragLayer/>
            </Container>
        </DndProvider>
    );
};


const mapStateToProps = (state) => {
    return {
        historyArr: state.galleryPage.galleryHistory,
        pageSize: state.galleryPage.pageSize,
        currentPage: state.galleryPage.currentPage
    }
}


export default connect (mapStateToProps, {deleteHistoryItem, setCurrentPages}) (GalleryHistory);


const Container = styled.main`
    max-width: 700px;
    margin: 0 auto;
    background-color: white;
    box-shadow: 0 1px 0 0 #d3d9de,0 0 0 1px #e7e8ec;
    border-radius: 4px;
    padding: 50px;
    h2 {
      margin-bottom: 30px;
    }
`

const HistoryWrapper = styled.ul`
    margin-top: 30px;
    display: grid;
    grid-template-columns:${props => props.pageSize? `repeat(${props.pageSize}, 1fr)` : '1fr' } ;
    grid-gap: 10px;
`

const Description = styled.div`
   p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.6em;
   }
`
const FaceSad = styled.div`
  width: 400px;
  margin: 0 auto;
  img {
    width: 100%;
  }
`