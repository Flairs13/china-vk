import React, {Component} from 'react';

class ProfileStatus extends Component {
    statusInputRef = React.createRef()

    constructor (props) {
        super (props)
        this.state = {
            editMode: false,
            status: this.props.status,
        }
    }



    editModeActivated = () => {
        this.setState ({editMode: true})
    }


    editModeDeactivated = () => {
        this.setState ({editMode: false})
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e) => {
        this.setState({status: e.currentTarget.value})
    }

    componentDidUpdate (prevProps, prevState) {

        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
                          })
        }
    }

    render () {
        return (
            <>
                <div>
                    {
                        !this.state.editMode ? <span onClick={this.editModeActivated}>{this.props.status || 'No status'}</span> :
                        <input ref={this.statusInputRef} autoFocus={true} onChange={this.onStatusChange} onBlur={this.editModeDeactivated} value={this.state.status} type="text"/>
                    }
                </div>
            </>
        );
    }
}

export default ProfileStatus;
