import * as React from 'react';
import {useEffect, useState} from 'react';
import './Main.scss';
import {currentUSer} from "../../Utils";
import Section from "../Section/Section";
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

    const {news_letter, sections} = props;

    const [user, setUser] = useState(null);

    const getUser = (): void => {
        currentUSer().then((response) => {
            setUser(response);
        })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <main>
            {sections["News Flash"] && <Section title={"News Flash"} icon={"rss"}>
                <News news_letter={news_letter}/>
            </Section>}
            {sections["Feature Employee"] && <Section title={"Featured Employees"} icon={"user"}>
                <FeaturedEmployee news_letter={news_letter}/>
            </Section>}
            {sections.Birthday && <Section title={"Birthdays"} icon={"cake-candles"}>
                <BirthDayBanner news_letter={news_letter}/>
            </Section>}
            {sections["Scam Notification"] && <ScamAwareness/>}
            {sections["New Joiners"] && <Section title={"New Joiners"} icon={"circle-plus"}>
                <NewJoiners news_letter={news_letter}/>
            </Section>}
            {sections["Movements / Promotions"] && <Section title={"Movements / Promotions"} icon={"briefcase"}>
                <Movements news_letter={news_letter}/>
            </Section>}
            {sections["Awards and Recognitions"] && <Section title={"Awards and Recognitions"} icon={"trophy"}>
                <Awards news_letter={news_letter}/>
            </Section>}
            {sections["Success Story"] && <ShareYourStory user={user}/>}
            {sections.Events && <Section title={"Upcoming Events"} icon={"calendar-days"}>
                <UpcomingEvents news_letter={news_letter}/>
            </Section>}
            {sections.Sugession && <BrightIdeas user={user}/>}
            {sections["JETEX Gifs"] && <Section>
                <Stickers/>
            </Section>}
            {sections.Quiz && <Section title={"Quiz"} icon={"circle-question"}>
                <Quiz news_letter={news_letter} user={user}/>
            </Section>}
            <div className="spacer"/>
        </main>
    );
}

export default Main