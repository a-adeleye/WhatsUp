import * as React from 'react';
// import {useEffect, useState} from 'react';
import './Main.scss';
// import {currentUSer} from "../../Utils";
import Section from "../Section/Section";
import FeaturedEmployee from "../Featured-Employee/Featured-Employee";
import FeaturedEmployeeV2 from "../Featured-Employee-v2/Featured-Employee-v2";
import News from "../News/News";
import BirthDayBanner from "../BirthDayBanner/BirthDayBanner";
// import ScamAwareness from "../ScamAwareness/ScamAwareness";
import NewJoiners from "../NewJoiners/NewJoiners";
import Movements from "../Movements/Movements";
import Anniversaries from "../Anniversaries/Anniversaries";
import Awards from "../Awards/Awards";
// import ShareYourStory from "../ShareYourStory/ShareYourStory";
// import BrightIdeas from "../BrightIdeas/BrightIdeas";
import UpcomingEvents from "../UpcomingEvents/UpcomingEvents";
// import Stickers from "../Stickers/Stickers";
// import Quiz from "../Quiz/Quiz";
import SectionHeader from "../SectionHeader/SectionHeader";
import SectionSpacer from "../SectionSpacer/SectionSpacer";

const Main: React.FC<any> = (props) => {

    const {news_letter, sections} = props;

    // const [user, setUser] = useState(null);

    // const getUser = (): void => {
    //     currentUSer().then((response) => {
    //         setUser(response);
    //     })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };

    // useEffect(() => {
    //     getUser();
    // }, []);

    const sectionItems: JSX.Element[] = [];

    if (sections["News Flash"]) {
        sectionItems.push(
            <Section key={"news-flash"} title={""} icon={"rss"}>
                <News news_letter={news_letter}/>
            </Section>
        );
    }

    if (sections["Feature Employee"]) {
        sectionItems.push(
            <FeaturedEmployee key={"feature-employee-v1"} news_letter={news_letter}/>
        );
        sectionItems.push(
            <FeaturedEmployeeV2 key={"feature-employee-v2"} news_letter={news_letter}/>
        );
    }

    if (sections.Birthday) {
        sectionItems.push(
            <Section key={"birthday"} className={"section--birthday"}>
                <BirthDayBanner news_letter={news_letter}/>
            </Section>
        );
    }

    if (sections.Anniversaries) {
        sectionItems.push(
            <Section key={"anniversaries"}>
                <SectionHeader bottomText="Anniversaries"/>
                <Anniversaries news_letter={news_letter}/>
            </Section>
        );
    }

    if (sections["New Joiners"]) {
        sectionItems.push(
            <Section key={"new-joiners"}>
                <SectionHeader topText="New" bottomText="Joiners"/>
                <NewJoiners news_letter={news_letter}/>
            </Section>
        );
    }

    if (sections["Movements / Promotions"]) {
        sectionItems.push(
            <Section key={"movements-promotions"}>
                <SectionHeader topText="Movements &" bottomText="Promotions"/>
                <Movements news_letter={news_letter}/>
            </Section>
        );
    }

    if (sections["Awards and Recognitions"]) {
        sectionItems.push(
            <Section key={"awards-recognitions"}>
                <SectionHeader topText="Awards and" bottomText="Recognitions"/>
                <Awards news_letter={news_letter}/>
            </Section>
        );
    }

    if (sections.Events) {
        sectionItems.push(
            <Section key={"events"} title={"Upcoming Events"} icon={"calendar-days"}>
                <UpcomingEvents news_letter={news_letter}/>
            </Section>
        );
    }

    return (
        <main>
            {sectionItems.map((item, index) => (
                <React.Fragment key={`section-fragment-${index}`}>
                    {item}
                    <SectionSpacer/>
                </React.Fragment>
            ))}
        </main>
    );
}

export default Main
