import * as React from 'react';

import "./Featured-Employee.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark, faQuoteLeft, faQuoteRight} from '@fortawesome/free-solid-svg-icons'
import {faCircle} from '@fortawesome/free-regular-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core'
import {extractImageUrl} from "../../Utils";
import {Image} from "office-ui-fabric-react";

library.add(faQuoteLeft, faQuoteRight, faBookmark, faCircle);


const FeaturedEmployee: React.FC<any> = (props) => {
    const {employee} = props;
    return (
        <div className={"featured"}>
            <div className={"featured-details"}>
                <FontAwesomeIcon icon={"bookmark"} className={"primary-text"} size={"xl"}/>
                <b>{employee?.EmployeeName}</b>
                <span>{employee?.Title}</span>
                <span>{employee?.Location}</span>
                <div className={"image"}>
                    <div className={"duration"}>{employee?.DurationText}</div>
                    <Image src={extractImageUrl(employee?.Image)} alt="Image"/>
                    <div className={"quote"}>
                        <FontAwesomeIcon icon={"quote-left"} className={"primary-text"} size={"2xl"}/>
                        <span>{employee?.ImageCaption}</span>
                        <FontAwesomeIcon icon={"quote-right"} className={"primary-text bottom-quote"} size={"2xl"}/>
                    </div>
                </div>
            </div>
            <div className={"featured-questions"}>
                <div className="question">
                    <FontAwesomeIcon icon={["far", "circle"]} size="xl" className={"primary-text"}/>
                    <div className="question-text">
                        <p>What do you enjoy most about working in Jetex?</p>
                        <div className="answer" dangerouslySetInnerHTML={{__html: employee?.EnjoyMost}}/>
                    </div>
                </div>
                <div className="question">
                    <FontAwesomeIcon icon={["far", "circle"]} size="xl" className={"primary-text"}/>
                    <div className="question-text">
                        <p>What&apos;s the biggest challenge you face in your job?</p>
                        <div className="answer" dangerouslySetInnerHTML={{__html: employee?.BiggestChallenge}}/>
                    </div>
                </div>
                <div className="question">
                    <FontAwesomeIcon icon={["far", "circle"]} size="xl" className={"primary-text"}/>
                    <div className="question-text">
                        <p>What has been your greatest achievement so far during your time
                            with Jetex?</p>
                        <div className="answer" dangerouslySetInnerHTML={{__html: employee?.Achievement}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturedEmployee