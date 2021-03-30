import React from 'react';

type PropsType = {
    height: string
    width: string
    fill: string
}

const ProfileSvg: React.FC<PropsType> = ({height, width, fill}) => {
    return (
        <svg width={width} height={height} fill={fill} viewBox="0 0 512 512" aria-labelledby='profilesvg'>
            <path d="M497.027,155.314l-230-152c-6.688-4.419-15.367-4.419-22.055,0l-230,152C9.37,159.016,6,165.284,6,172v320
			c0,11.046,8.954,20,20,20c5.833,0,444.336,0,460,0c11.046,0,20-8.954,20-20V172C506,165.284,502.63,159.016,497.027,155.314z
			 M296,472h-80V352h80V472z M466,472H336V332c0-11.046-8.954-20-20-20H196c-11.046,0-20,8.954-20,20v140H46V182.755L256,43.973
			l210,138.782V472z"/>
        </svg>
    );
};

export default ProfileSvg;