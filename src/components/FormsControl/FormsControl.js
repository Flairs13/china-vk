import React from 'react';
import styled from "styled-components/macro";


export const FormControl = ({input, meta, typeField, ...props}) => {
    const element = React.createElement (
        typeField,
        {...input, ...props}
    )
    const hasError = meta.error && meta.touched;
    return (
        <InputWrapper>
            <label>
                {element}
            </label>
            {hasError && <span>{meta.error}</span>}
        </InputWrapper>
    );
};


const InputWrapper = styled.div`
  margin-bottom: 20px;
`



