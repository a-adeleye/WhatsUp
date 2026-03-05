import * as React from 'react';
import { useEffect, useState } from 'react';
import './News.scss';
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import { extractImageUrl, getLibraryItemsWithMetadata, getListItemsByTitle } from "../../Utils";
import { Spinner } from "office-ui-fabric-react";

const News: React.FC<any> = (props) => {
    const { news_letter } = props;
    const [news, setNews] = useState([]);
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
            });
    };

    useEffect(() => {
        getData();
    }, [news_letter]);


    return (
        <>
            {loading && <div className={"text-center"}>
                <Spinner size={3} />
            </div>}

            {news.map((item: any) => (
                <div className={"news"} key={item.id}>
                    <div className={"subtitle"}>
                        <h2>{item.title}</h2>
                    </div>
                    {item.isVideo ? (
                        <div className={"news-video"}>
                            {item.videoUrl ? (
                                <video controls src={item.videoUrl} />
                            ) : (
                                <div>No video available</div>
                            )}
                        </div>
                    ) : (
                        <ImageCarousel images={item.images} />
                    )}
                    <div className={"text"} dangerouslySetInnerHTML={{ __html: item.content }} />
                </div>))
            }
        </>
    );
};

export default News
