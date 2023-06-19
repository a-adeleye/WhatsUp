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
    const [sections, setSections] = useState<any>([]);

    const getBaseData = (): void => {
        Promise.all([
            getListItemsByTitle('Newsletter', 'Published eq 1'),
            getListItemsByTitle("Newsletter sections"),
        ])
            .then(([news_letter, sections]) => {
                setNewsLetter(news_letter[0]);
                setSections(sections);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getBaseData();
    }, []);

    return (
        <body>
        <Header date={newsLetter?.Title}/>
        <Main news_letter={newsLetter} sections={sections}/>
        </body>
    );
}

export default WhatsUp