import * as React from 'react';
import {useEffect, useState} from 'react';

import "./Featured-Employee.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark, faQuoteLeft, faQuoteRight} from '@fortawesome/free-solid-svg-icons'
import {faCircle} from '@fortawesome/free-regular-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core'
import {extractImageUrl, getListItemsByTitle} from "../../Utils";
import {Image, Spinner} from "office-ui-fabric-react";

library.add(faQuoteLeft, faQuoteRight, faBookmark, faCircle);


const FeaturedEmployee: React.FC<any> = (props) => {
    const {news_letter} = props;
    const [featuredEmployee, setFeaturedEmployee] = useState<any>({});
    const [loading, setLoading] = useState(true);

    const getData = () => {
        if (!news_letter) {
            return;
        }
        getListItemsByTitle("FeaturedEmployee", "NewsletterId eq '" + news_letter.Id + "'")
            .then((response) => {
                setFeaturedEmployee(response[0]);
                setLoading(false);
            })
    }

    useEffect(() => {
        getData();
    }, [news_letter])

    return (
        <>
            {loading && <div className={"text-center"}>
                <Spinner size={3}/>
            </div>}
            <div className={"featured"}>
                <div className={"featured-details"}>
                    <FontAwesomeIcon icon={"bookmark"} className={"primary-text"} size={"xl"}/>
                    <b>{featuredEmployee?.EmployeeName}</b>
                    <span>{featuredEmployee?.Title}</span>
                    <span>{featuredEmployee?.Location}</span>
                    <div className={"image"}>
                        <div className={"duration"}>{featuredEmployee?.DurationText}</div>
                        <Image src={extractImageUrl(featuredEmployee?.Image)} alt="Image"/>
                        <div className={"quote"}>
                            <FontAwesomeIcon icon={"quote-left"} className={"primary-text"} size={"2xl"}/>
                            <span>{featuredEmployee?.ImageCaption}</span>
                            <FontAwesomeIcon icon={"quote-right"} className={"primary-text bottom-quote"} size={"2xl"}/>
                        </div>
                    </div>
                </div>
                <div className={"featured-questions"}>
                    <div className="question">
                        <FontAwesomeIcon icon={["far", "circle"]} size="xl" className={"primary-text"}/>
                        <div className="question-text">
                            <p>What do you enjoy most about working in Jetex?</p>
                            <div className="answer" dangerouslySetInnerHTML={{__html: featuredEmployee?.EnjoyMost}}/>
                        </div>
                    </div>
                    <div className="question">
                        <FontAwesomeIcon icon={["far", "circle"]} size="xl" className={"primary-text"}/>
                        <div className="question-text">
                            <p>What&apos;s the biggest challenge you face in your job?</p>
                            <div className="answer"
                                 dangerouslySetInnerHTML={{__html: featuredEmployee?.BiggestChallenge}}/>
                        </div>
                    </div>
                    <div className="question">
                        <FontAwesomeIcon icon={["far", "circle"]} size="xl" className={"primary-text"}/>
                        <div className="question-text">
                            <p>What has been your greatest achievement so far during your time
                                with Jetex?</p>
                            <div className="answer" dangerouslySetInnerHTML={{__html: featuredEmployee?.Achievement}}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeaturedEmployee