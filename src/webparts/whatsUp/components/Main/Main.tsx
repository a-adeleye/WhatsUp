import * as React from 'react';
import {useEffect, useState} from 'react';
import './Main.scss';
import Section from "../Section/Section";
import News from "../News/News";
import {getListByTitle} from "../../Utils";
import {Spinner} from "office-ui-fabric-react";

require('../../assets/images/14.jpg');
require('../../assets/images/23.jpg');
require('../../assets/images/15.jpg');
require('../../assets/images/31.jpg');

const Main: React.FC<any> = () => {

    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState([]);

    const extractImageUrl = (jsonString: string) => {
        const data = JSON.parse(jsonString);
        return data.serverRelativeUrl;
    }

    const extractImages = (news: any, imageData: any) => {
        return imageData.filter((image: any) => news.Id === image.NewsContentId)
            .map((image: any) => extractImageUrl(image.Image));
    };

    const extractNews = (newsData: any, imageData: any) => {
        const extractedNewsArray = newsData.map((news: any) => ({
            id: news.Id,
            title: news.Title,
            content: news.Details,
            created: news.Created,
            images: extractImages(news, imageData)
        }));

        sortNews(extractedNewsArray)

        console.log(extractedNewsArray);
    }
    const sortNews = (news: any[]) => {
        news.sort((a: any, b: any) => {
            const dateA: any = new Date(a.created);
            const dateB: any = new Date(b.created);
            return dateB - dateA;
        });
        setNews(news);
    }

    const getNewsData = (): void => {
        setLoading(true);
        Promise.all([
            getListByTitle('NewsContent'),
            getListByTitle('NewsImages'),
        ])
            .then(([news, images]) => {
                extractNews(news, images);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getNewsData();
    }, []);


    return (
        <main>
            <Section title={"News Flash"} icon={"rss"}>
                <div className={"text-center"}>
                    {loading && <Spinner/>}
                </div>
                {news.map(item => (
                    <News title={item.title}
                          text={item.content}
                          key={item.id}
                          images={item.images}
                    />
                ))}
            </Section>
            <Section title={"Featured Employees"} icon={"user"}/>
            <Section title={"Birthdays"} icon={"cake-candles"}/>
        </main>
    );
}

export default Main