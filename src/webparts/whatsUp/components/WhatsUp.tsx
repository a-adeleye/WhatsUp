import * as React from 'react';
import {IWhatsUpProps} from './IWhatsUpProps';
import Header from "./Header/Header";
import './WhatsUp.scss';
import Main from "./Main/Main";
import AOS from 'aos';


AOS.init();

export default class WhatsUp extends React.Component<IWhatsUpProps, {}> {
    public render(): React.ReactElement<IWhatsUpProps> {
        return (
            <body className={"container"}>
            <Header/>
            <Main/>
            </body>
        );
    }
}
