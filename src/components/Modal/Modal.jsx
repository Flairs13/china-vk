import React from 'react';
import classes from './Modal.module.css'


const Modal = (props) => {

    const leave = () => {
        props.logout()
        return props.modalHide()
    }

    return (
           <div className={classes.modalWrapper}>
               <div className={classes.modal}>
                   <h1>Do you really want to leave?</h1>
                   <div className={classes.btns}>
                       <button onClick={leave}>Yes</button>
                       <button onClick={props.modalHide}>No</button>
                   </div>

               </div>
           </div>


    );
};

export default Modal;
