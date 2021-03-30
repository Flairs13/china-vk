import React, {useEffect, useRef} from 'react';

const TestArea = (props) => {
    const textArea = useRef()

    useEffect(() => {
        props.children.ref.current.focus()
    },[])


    return (
        <div>
            {props.children}
        </div>
    );
};

export default TestArea;
