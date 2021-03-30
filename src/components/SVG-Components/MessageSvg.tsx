import React from 'react';

type PropsType = {
    height: string
    width: string
    fill: string
}

const MessageSvg: React.FC<PropsType> = ({height, width, fill}) => {
    return (
        <svg width={width} height={height} fill={fill} viewBox="0 0 511.096 511.096" aria-labelledby='messagesvg'>
            <path d="m74.414 480.548h-36.214l25.607-25.607c13.807-13.807 22.429-31.765 24.747-51.246-59.127-38.802-88.554-95.014-88.554-153.944 0-108.719 99.923-219.203 256.414-219.203 165.785 0 254.682 101.666 254.682 209.678 0 108.724-89.836 210.322-254.682 210.322-28.877 0-59.01-3.855-85.913-10.928-25.467 26.121-59.973 40.928-96.087 40.928z"/>
        </svg>
    );
};

export default MessageSvg;