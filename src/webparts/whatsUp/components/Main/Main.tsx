import * as React from 'react';
import {useEffect, useState} from 'react';
import './Main.scss';
import {extractImageUrl, getListItemsByTitle} from "../../Utils";
import Section from "../Section/Section";
import {Spinner} from "office-ui-fabric-react";
import FeaturedEmployee from "../Featured-Employee/Featured-Employee";
import News from "../News/News";
import BirthDayBanner from "../BirthDayBanner/BirthDayBanner";
import ScamAwareness from "../ScamAwareness/ScamAwareness";
import NewJoiners from "../NewJoiners/NewJoiners";
import Movements from "../Movements/Movements";
import Awards from "../Awards/Awards";
import ShareYourStory from "../ShareYourStory/ShareYourStory";
import BrightIdeas from "../BrightIdeas/BrightIdeas";

const Main: React.FC<any> = (props) => {

    const {news_letter} = props;

    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState([]);
    const [featuredEmployee, setFeaturedEmployee] = useState({});
    const [birthdayBanners, setBirthdayBanners] = useState([]);
    const [birthdayText, setBirthdayText] = useState([]);
    const [celebrants, setCelebrants] = useState([]);

    const extractImages = (news: any, imageData: any) => {
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
            images: extractImages(news, imageData)
        }));

        setNews(extractedNewsArray);
        setLoading(false);
    }

    const getData = (): void => {
        if (!news_letter) {
            return;
        }
        Promise.all([
            getListItemsByTitle('NewsContent', "NewsletterId eq '" + news_letter.Id + "'"),
            getListItemsByTitle("NewsImages"),
            getListItemsByTitle("FeaturedEmployee", "NewsletterId eq '" + news_letter.Id + "'"),
            getListItemsByTitle("Birthday Banners", "NewsletterId eq '" + news_letter.Id + "'"),
            getListItemsByTitle("Birthday Text", "NewsletterId eq '" + news_letter.Id + "'"),
            getListItemsByTitle("Birthday List", "NewsletterId eq '" + news_letter.Id + "'"),
        ])
            .then(([news, images, employee, birthday_banner, birthday_text, birthdays]) => {
                extractNews(news, images);
                setFeaturedEmployee(employee[0]);
                setBirthdayBanners(birthday_banner);
                setBirthdayText(birthday_text[0]);
                setCelebrants(birthdays);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getData();
    }, [news_letter]);

    return (
        <main>
            <Section title={"News Flash"} icon={"rss"}>
                <div className={"text-center"}>
                    {loading && <Spinner/>}
                </div>
                {news.slice(0, 2).map(item => (
                    <News title={item.title}
                          text={item.content}
                          key={item.id}
                          images={item.images}
                    />
                ))}
            </Section>
            <Section title={"Featured Employees"} icon={"user"}>
                <FeaturedEmployee employee={featuredEmployee}/>
            </Section>
            <Section title={"Birthdays"} icon={"cake-candles"}>
                <BirthDayBanner data={birthdayBanners} birthday_text={birthdayText} celebrants={celebrants}
                                news_letter={news_letter}/>
            </Section>
            <ScamAwareness/>
            <Section title={"New Joiners"} icon={"circle-plus"}>
                <NewJoiners news_letter={news_letter}/>
            </Section>
            <div className="spacer"></div>
            <Section title={"Awards / Promotions"} icon={"briefcase"}>
                <Movements news_letter={news_letter}/>
            </Section>
            <div className="spacer"></div>
            <Section title={"Awards and Recognitions"} icon={"trophy"}>
                <Awards news_letter={news_letter}/>
            </Section>
            <ShareYourStory/>
            <div className="spacer"></div>
            <div>Upcoming events</div>
            <div className="spacer"></div>
            <BrightIdeas/>
        </main>
    );
}

export default Main