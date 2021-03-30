import React, {useEffect, useRef, useState,useCallback} from 'react';
import styled from "styled-components/macro";
import ContentEditable from 'react-contenteditable'
import { Button } from '../../ProfileEdit/ProfileEdit';



type PropsType = {
    status: string
    isOwner: boolean
    updateStatus: (status: string) => void
}


const ProfileStatusHook: React.FC<PropsType> = (props) => {
    const [editMode,setEditMode] = useState(false)
    const [status,setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    },[props.status])

   const editModeActivated = () => {
        setEditMode(true)
    }

    console.log('render A')

    const editModeDeactivated = () => {
        setEditMode(false)
    }

    const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.innerHTML)
        // setStatus(e.currentTarget.value)
    }

    return (
        <>
            <div>
                {props.isOwner ?
                    !editMode ?
                        <StatusOff style={{wordBreak: 'break-all'}} onClick={editModeActivated}>{props.status || 'No status'}</StatusOff>:
                        <StatusActivated updateStatus={props.updateStatus} onStatusChange={onStatusChange} value={status} editModeDeactivated={editModeDeactivated}/>
                        :
                        <span style={{wordBreak: 'break-all'}}>{props.status || 'No status'}</span>
                }
            </div>
        </>
    );
};

export default ProfileStatusHook;

const StatusOff = styled.p`
  padding: 2px;
      &:hover {
        background-color: #f0f2f5;
        cursor: pointer;
      }
`




type PropsActivated = {
    onStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
    editModeDeactivated: () => void
    updateStatus: (status : string) => void

}


const StatusActivated: React.FC<PropsActivated> = (props) => {
    const status = useRef<HTMLDivElement>(null)
    const statusWrapper = useRef<HTMLDivElement>(null)
    console.log('Render B')

    useEffect(() => {
        selectElementContents(status.current)
        document.addEventListener('click', handleClickOutside, true);
    },[])

    const handleClickOutside = (event: MouseEvent): void => {
        if (statusWrapper.current && !statusWrapper.current.contains(event.target as Node)) {
            props.editModeDeactivated();
            document.removeEventListener('click', handleClickOutside, true);

        }

    };

    const buttonClickHandler = () => {
        props.updateStatus(props.value)
        props.editModeDeactivated()
    }

    const changeHandler = (e: any) => {
        props.onStatusChange(e)
    }

    function selectElementContents(el: any) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection() as any;
        sel.removeAllRanges();
        sel.addRange(range);
    }

    const  maxSymbolsStatus = (e: any) => {
        if (e.key === 'Enter'){
            props.updateStatus(e.currentTarget.innerHTML)
            props.editModeDeactivated()
        }
        console.log(props.value)

        if (e.currentTarget.innerHTML.length > 130){
            e.preventDefault()
        }
    }

    const contentEditableStyle: React.CSSProperties = {
        border: '1px solid #d3d9de',
        padding: '5px 9px 7px',
        borderRadius: '3px',
    }



    return (
        <StatusActiveWrapper ref={statusWrapper}>
            <ContentEditable onKeyPress={maxSymbolsStatus} style={contentEditableStyle} disabled={false} onChange={changeHandler} html={props.value} innerRef={status}/>
            <StatusButton onClick={buttonClickHandler}>Сохранить</StatusButton>
        </StatusActiveWrapper>

    )
}

const StatusActiveWrapper = styled.div<any>`
    border: 1px solid #d3d9de;
    border-radius: 2px;
    background-color: #fafbfc;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12);
    padding: 15px;
    margin: 0 -26px;
`
const StatusButton = styled(Button)`
  margin-top: 10px;
`
