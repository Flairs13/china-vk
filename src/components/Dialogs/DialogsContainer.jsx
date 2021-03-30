import {addMessageActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {WithAuthRedirect} from "../Hoc/withAuthRedirect";
import {compose} from "redux";


let mapStateToProps = (state) => {

    return {
        dialogsState: state.dialogsPage,
        newMessageText: state.dialogsPage.newMessageText,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (newMessageBody) => {
            dispatch (addMessageActionCreator (newMessageBody))
        }
    }
}


const DialogsContainer = compose (
    connect (mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
) (Dialogs)

export default DialogsContainer;

