import * as React from 'react';
import {useEffect, useState} from 'react';
import Header from "./Header/Header";
import './WhatsUp.scss';
import Main from "./Main/Main";
import {getListItemsByTitle} from "../Utils";
import {Spinner} from "office-ui-fabric-react";


const WhatsUp: React.FC<any> = () => {

    const [newsLetter, setNewsLetter] = useState<any>(null);
    const [sections, setSections] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    const extractSections = (data: any[]) => {
        const sections: any = {};
        data.forEach(item => {
            sections[item.Title] = item.Visible;
        });
        setSections(sections);
        setLoading(false);
    };

    const getBaseData = (): void => {
        Promise.all([
            getListItemsByTitle('Newsletter', 'Published eq 1'),
            getListItemsByTitle("Newsletter sections"),
        ])
            .then(([news_letter, sections]) => {
                setNewsLetter(news_letter[0]);
                extractSections(sections);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        getBaseData();
    }, []);

    return (
        <body>
        {loading && <div className={"page-loader"}>
            <Spinner size={3}/>
        </div>}
        {!loading &&
            <>
                <Header date={newsLetter?.Title}/>
                <Main news_letter={newsLetter} sections={sections} loading={loading}/>
            </>}
        </body>
    );
}

export default WhatsUp