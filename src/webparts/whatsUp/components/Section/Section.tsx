import * as React from 'react';
import './Section.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBriefcase,
    faCakeCandles,
    faCalendarDays,
    faCirclePlus,
    faCircleQuestion,
    faRss,
    faTrophy,
    faUser
} from '@fortawesome/free-solid-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'

library.add(faUser, faRss, faCakeCandles, faCirclePlus, faTrophy, faBriefcase, faCalendarDays, faCircleQuestion);

const Section: React.FC<any> = (props) => {
    const {title, icon, children} = props;
    return (
        <section className={title ? "container" : "container no-padding"}>
            {title && <div className={"section-title"}>
                <FontAwesomeIcon icon={icon} size="xl"/>
                <h2>{title}</h2>
            </div>}
            <div>{children}</div>
        </section>
    );
}

export default Section