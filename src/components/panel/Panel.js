import React, {Component} from 'react';
import {DarkThemeContext} from "../../context/DarkThemeContext";
import Chevron from '../../assets/chevron-bottom.png';

import './Panel.scss';

export class Panel extends Component {
    state = {
        isOpen: false,
        inputVal: 'test'
    };

    onOpenAndClosePanelClick = () => {
        this.setState({isOpen: !this.state.isOpen})
    };

    render() {
        const {children, label} = this.props;
        const {isOpen} = this.state;

        return (
            <DarkThemeContext.Consumer>
                {
                    (value) => {
                        const {isDarkTheme} = value;
                        return (
                            <div className={`may-panel${isDarkTheme ? '-black' : ''} card`}
                                 onClick={this.onOpenAndClosePanelClick}>
                                <div className="may-panel-header card-header">
                                    <div><b>{label}</b></div>
                                    <div className={`may-panel-header-chevron ${isOpen ? 'up' : ''}`}>
                                        <img src={Chevron} alt="chevron arrow"/>
                                    </div>
                                </div>
                                {
                                    isOpen && (<div className="card-body">{children}</div>)
                                }
                            </div>
                        )
                    }
                }
            </DarkThemeContext.Consumer>
        );
    }
}
