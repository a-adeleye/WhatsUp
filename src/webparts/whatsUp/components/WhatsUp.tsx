import * as React from 'react';
import {useEffect, useState} from 'react';
import Header from "./Header/Header";
import './WhatsUp.scss';
import Main from "./Main/Main";
import AOS from 'aos';
import {getListItemsByTitle} from "../Utils";


AOS.init();

const WhatsUp: React.FC<any> = () => {

    const [newsLetter, setNewsLetter] = useState<any>(null);

    const getNewsLetter = () => {
        getListItemsByTitle("Newsletter", 'Published eq 1').then((response) => {
            setNewsLetter(response[0]);
        });
    }

    useEffect(() => {
        getNewsLetter();
    }, []);

    return (
        <body>
        <Header date={newsLetter?.Title}/>
        <Main news_letter={newsLetter}/>
        </body>
    );
}

export default WhatsUp