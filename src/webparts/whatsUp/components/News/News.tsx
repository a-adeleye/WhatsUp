import * as React from 'react';
import {useEffect, useState} from 'react';
import './News.scss';
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import {extractImageUrl, getListItemsByTitle} from "../../Utils";
import {Spinner} from "office-ui-fabric-react";

const News: React.FC<any> = (props) => {
    const {news_letter} = props;
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    const extractNewsImages = (news: any, imageData: any) => {
        return imageData.filter((image: any) => news.Id === image.NewsContentId)
            .map((image: any) => extractImageUrl(image.Image));
    };
    const extractNews = (newsData: any, imageData: any) => {

        newsData.sort((a: any, b: any) => {
            return a.NewsOrder - b.NewsOrder;
        })

        const extractedNewsArray = newsData.map((news: any) => ({
            id: news.Id,
            title: news.Title,
            content: news.Details,
            images: extractNewsImages(news, imageData)
        }));

        setNews(extractedNewsArray);
        setLoading(false);
    }
    const getData = () => {
        if (!news_letter) {
            return;
        }

        Promise.all([
            getListItemsByTitle('NewsContent', "NewsletterId eq '" + news_letter.Id + "'"),
            getListItemsByTitle("NewsImages")])
            .then(([news, images]) => {
                extractNews(news, images);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getData();
    }, [news_letter])


    return (
        <>
            {loading && <div className={"text-center"}>
                <Spinner size={3}/>
            </div>}

            {news.map((item: any) => (
                <div className={"news"} key={item.id}>
                    <div className={"subtitle"}>
                        <h2>{item.title}</h2>
                    </div>
                    <ImageCarousel images={item.images}/>
                    <div className={"text"} dangerouslySetInnerHTML={{__html: item.content}}/>
                </div>))
            }
        </>
    );
}

export default News