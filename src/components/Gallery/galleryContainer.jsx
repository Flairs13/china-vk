import React, {useEffect} from 'react';
import Gallery from "./Gallery";
import {connect} from "react-redux";
import {getImg, isFirstRender} from "../../redux/Gallery/gallery-action";
import {getImgInfo, getStatusError, getStatusSelect, isFirstRenderSelect} from "../../redux/Gallery/gallery-select";



const GalleryContainer = (props) => {

    useEffect(() => {
        if (props.isRender){
            props.getImg()
            props.isFirstRender(false)
        }
    })

    return (
        <Gallery {...props} getImg={props.getImg}/>
    );
};

const mapStateToProps = (state) => ({
    imgInfo: getImgInfo(state),
    isRender: isFirstRenderSelect(state),
    status: getStatusSelect(state),
    error: getStatusError(state),
})

export default connect (mapStateToProps, {getImg,isFirstRender}) (GalleryContainer);
