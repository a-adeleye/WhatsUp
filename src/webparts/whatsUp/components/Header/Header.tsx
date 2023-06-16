import * as React from 'react';
import './Header.scss';

const Header: React.FC<any> = (props) => {
    const {date} = props;
    return (
        <header>
            <div className={"header-image"}>
                <img alt="" src={require('../../assets/Whatsup-logo.png')}/>
            </div>
            <div className={"title"}>
                <h4>Jetex Internal Newsletter</h4>
                <h4 className={"date"}>{date}</h4>
            </div>
        </header>
    );
}

export default Header
