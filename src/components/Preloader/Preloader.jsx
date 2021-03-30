import React, {Component} from 'react';
import Preloaders from '../../assets/images/Preloader.svg'

class Preloader extends Component {
    render() {
        return (
            <img style={{width: '100%'}} src={Preloaders} alt={'#'}/>
        );
    }
}

export default Preloader;