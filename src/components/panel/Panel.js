import React, {Component} from 'react';
import Chevron from '../../assets/chevron-bottom.png';

import './Panel.scss';

export class Panel extends Component {
    state = {
        isOpen: false,
        inputVal: 'test'
    };

    onClick = () => {
        this.setState({isOpen: !this.state.isOpen})
    };

    render() {
        const {children, label} = this.props;
        const {isOpen} = this.state;

        return (
            <div className="may-panel card">
                <div className="may-panel-header card-header">
                    <div><b>{label}</b></div>
                    <div className={`may-panel-header-chevron ${isOpen ? 'up' : ''}`} onClick={this.onClick}>
                        <img src={Chevron} alt="chevron arrow"/>
                    </div>
                </div>
                {
                    isOpen && (<div className="card-body">{children}</div>)
                }
            </div>
        );
    }
}
