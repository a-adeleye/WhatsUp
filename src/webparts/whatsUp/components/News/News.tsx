import * as React from 'react';
import { useEffect, useState } from 'react';
import './News.scss';
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import { extractImageUrl, getLibraryItemsWithMetadata, getListItemsByTitle } from "../../Utils";
import { Spinner } from "office-ui-fabric-react";

interface NewsItem {
    id: number;
    title: string;
    content: string;
    isVideo: boolean;
    videoUrl: string;
    images: string[];
}

const News: React.FC<any> = (props) => {
    const { news_letter } = props;
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    const extractNewsImages = (news: any, imageData: any) => {
        return imageData.filter((image: any) => news.Id === image.NewsContentId)
            .map((image: any) => extractImageUrl(image.Image));
    };

    const extractNewsVideo = (news: any, videoData: any) => {
        const videoItem = videoData.find((video: any) => news.Id === video.NewsContentId);
        if (!videoItem) {
            console.log("No video found for news ID:", news.Id);
            return "";
        }
        console.log("News video item found:", news.Id, videoItem);
        const videoUrl = videoItem.FileRef ||
            (videoItem.File && videoItem.File.ServerRelativeUrl) ||
            videoItem.EncodedAbsUrl ||
            "";
        console.log("Extracted video URL:", videoUrl);
        return videoUrl;
    };

    const extractNews = (newsData: any, imageData: any, videoData: any) => {
        newsData.sort((a: any, b: any) => {
            return a.NewsOrder - b.NewsOrder;
        });

        const extractedNewsArray = newsData.map((news: any) => {
            const isVideo = !!news.Video;
            return {
                id: news.Id,
                title: news.Title,
                content: news.Details,
                isVideo,
                videoUrl: isVideo ? extractNewsVideo(news, videoData) : "",
                images: isVideo ? [] : extractNewsImages(news, imageData)
            };
        });

        setNews(extractedNewsArray);
        setLoading(false);
    };

    const getData = () => {
        if (!news_letter) {
            return;
        }

        Promise.all([
            getListItemsByTitle('NewsContent', "NewsletterId eq '" + news_letter.Id + "'"),
            getListItemsByTitle("NewsImages"),
            getLibraryItemsWithMetadata("News Videos")])
            .then(([news, images, videos]) => {
                console.log("Videos from document library:", videos);
                extractNews(news, images, videos);
            })
            .catch((error) => {
                console.log("Error fetching data:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        getData();
    }, [news_letter]);
    const renderMedia = (item: NewsItem): JSX.Element => {
        if (item.isVideo) {
            return item.videoUrl ? (
                <video className={"news-card__video"} controls src={item.videoUrl} />
            ) : (
                <div className={"news-card__empty-media"}>No video available</div>
            );
        }

        if (item.images.length > 1) {
            return (
                <div className={"news-card__carousel"}>
                    <ImageCarousel images={item.images} />
                </div>
            );
        }

        if (item.images[0]) {
            return <img className={"news-card__image"} src={item.images[0]} alt={item.title} />;
        }

        return <div className={"news-card__empty-media"}>{item.title}</div>;
    };

    return (
        <>
            {loading && <div className={"text-center"}>
                <Spinner size={3} />
            </div>}

            {!loading && <div className={"news-list"}>
                {news.map((item) => (
                    <article className={"news-card"} key={item.id}>
                        <div className={"news-card__media"}>
                            {renderMedia(item)}
                            <div className={"news-card__overlay"}>
                                <h2 className={"news-card__title"}>{item.title}</h2>
                            </div>
                        </div>
                        {item.content && <div
                            className={"news-card__content"}
                            dangerouslySetInnerHTML={{ __html: item.content }}
                        />}
                    </article>
                ))}
            </div>}
        </>
    );
};

export default News
