import React, {memo} from 'react';
import GalleryHistoryItem from "../GalleryHistoryItem";

const styles = {
    display: 'inline-block',
    transform: 'rotate(-7deg)',
    WebkitTransform: 'rotate(-7deg)',
};
export const BoxDragPreview = memo (({id,url,item}) => {
    return (
        <div style={styles}>
            <GalleryHistoryItem item={item} id={id} url={url}/>
        </div>
    );
});


