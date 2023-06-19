import * as React from 'react';
import {useEffect, useState} from 'react';
import './Main.scss';
import {currentUSer, extractImageUrl, getListItemsByTitle} from "../../Utils";
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
import UpcomingEvents from "../UpcomingEvents/UpcomingEvents";
import Stickers from "../Stickers/Stickers";
import Quiz from "../Quiz/Quiz";

const Main: React.FC<any> = (props) => {

    const {news_letter} = props;

    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState([]);
    const [featuredEmployee, setFeaturedEmployee] = useState({});
    const [birthdayBanners, setBirthdayBanners] = useState([]);
    const [birthdayText, setBirthdayText] = useState([]);
    const [celebrants, setCelebrants] = useState([]);
    const [events, setEvents] = useState([]);
    const [quiz, setQuiz] = useState([]);
    const [user, setUser] = useState(null);

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
            getListItemsByTitle("Events", "NewsletterId eq '" + news_letter.Id + "'"),
            getListItemsByTitle("Quiz", "NewsletterId eq '" + news_letter.Id + "'"),
            currentUSer(),
        ])
            .then(([news, images, employee, birthday_banner, birthday_text, birthdays, events, quiz, user]) => {
                extractNews(news, images);
                setFeaturedEmployee(employee[0]);
                setBirthdayBanners(birthday_banner);
                setBirthdayText(birthday_text[0]);
                setCelebrants(birthdays);
                setEvents(events);
                setQuiz(quiz);
                setUser(user);
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
            <div className="spacer"/>
            <Section title={"Awards / Promotions"} icon={"briefcase"}>
                <Movements news_letter={news_letter}/>
            </Section>
            <div className="spacer"/>
            <Section title={"Awards and Recognitions"} icon={"trophy"}>
                <Awards news_letter={news_letter}/>
            </Section>
            <ShareYourStory user={user}/>
            <div className="spacer"/>
            <Section title={"Upcoming Events"} icon={"calendar-days"}>
                <UpcomingEvents events={events}/>
            </Section>
            <div className="spacer"/>
            <BrightIdeas user={user}/>
            <div className="spacer"/>
            <Section>
                <Stickers/>
            </Section>
            <div className="spacer"/>
            <Section title={"Quiz"} icon={"circle-question"}>
                <Quiz quiz={quiz} user={user}/>
            </Section>
            <div className="spacer"/>
        </main>
    );
}

export default Main