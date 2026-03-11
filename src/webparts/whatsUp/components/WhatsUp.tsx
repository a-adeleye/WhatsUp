import * as React from 'react';
import {useEffect, useState} from 'react';
import '@fontsource/josefin-sans/300.css';
import '@fontsource/josefin-sans/400.css';
import '@fontsource/josefin-sans/500.css';
import '@fontsource/josefin-sans/600.css';
import '@fontsource/josefin-sans/700.css';
import './WhatsUp.scss';
import Main from "./Main/Main";
import {getListItemsByTitle} from "../Utils";
import {Spinner} from "office-ui-fabric-react";
import Header from "./Header/Header";


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
            getListItemsByTitle('Newsletter', 'Status eq \'In Review\''),
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
        <div className="whats-up">
            {loading && <div className={"page-loader"}>
                <Spinner size={3}/>
            </div>}
            {!loading && <>
                <div className="whats-up__header">
                    <Header news_letter={newsLetter}/>
                </div>
                <div className="whats-up__main">
                    <Main news_letter={newsLetter} sections={sections} loading={loading}/>
                </div>
            </>}
        </div>
    );
}

export default WhatsUp
